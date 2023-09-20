import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import { RpcException } from '@nestjs/microservices';
import { Meetup, Tags } from '../models';
import { SearchService } from '../search/search.service';
import { Point } from 'geojson';
import { Cordinates } from '../dto/location-meetup.request';

@Injectable()
export class MeetupService {
  constructor(
    private searchService: SearchService,
    @InjectRepository(Meetup)
    private meetupRepository: Repository<Meetup>,
    @InjectRepository(Tags)
    private meetupTagsRepository: Repository<Tags>
  ) {}

  async addMeetup(data: CreateMeetupRequest): Promise<Meetup> {
    const pointObject: Point = {
      type: 'Point',
      coordinates: [data.lat, data.long]
    };

    const filteredData = {
      ...data,
      tags: undefined,
      location: pointObject
    };
    const meetup = await this.meetupRepository.save(filteredData);
    const { tags } = data;
    tags.forEach(async (element) => {
      await this.meetupTagsRepository.save({
        meetup,
        name: element
      });
    });

    this.searchService.indexMeetup(meetup);
    return meetup;
  }

  async getAllMeetups(): Promise<Meetup[]> {
    return await this.meetupRepository.find({
      relations: {
        tags: true
      }
    });
  }

  async getRange(location: Cordinates) {
    const origin: Point = {
      type: 'Point',
      coordinates: [location.long, location.lat]
    };

    const locations = await this.meetupRepository
      .createQueryBuilder('t_test_location')
      .select([
        '*',
        'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance'
      ])
      .where(
        'ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)'
      )
      .orderBy('distance', 'ASC')
      .setParameters({
        origin: JSON.stringify(origin),
        range: 100 * 1000
      })
      .getRawMany();
    return locations;
  }

  async getFilteredMeetups(): Promise<Meetup[]> {
    return await this.meetupRepository.find({
      relations: {
        tags: true
      }
    });
  }

  async removeMeetupById(id: number) {
    const selectedMeetup = await this.findById(id);
    await this.meetupRepository.delete(selectedMeetup.id);
    this.searchService.delete(selectedMeetup.id);
    return selectedMeetup;
  }

  async updateMeetup(updateMeetupRequest: CreateMeetupRequest, id: number) {
    const meetup = await this.findById(id);
    if (updateMeetupRequest.tags && updateMeetupRequest.tags.length !== 0) {
      await this.clearTags(meetup.id);
      updateMeetupRequest.tags.forEach(async (element) => {
        await this.meetupTagsRepository.save({
          meetup,
          name: element
        });
      });
    }
    Object.assign(meetup, updateMeetupRequest);
    await this.meetupRepository.save(meetup);
    this.searchService.update(meetup);
    return meetup;
  }

  async findById(id: number): Promise<Meetup> {
    const selectedUser = await this.meetupRepository.findOneBy({
      id: id
    });
    if (!selectedUser) {
      throw new RpcException(
        new NotFoundException(`meetup with id ${id} not found`)
      );
    }
    return selectedUser;
  }

  async clearTags(meetupID: number) {
    const records = await this.meetupTagsRepository.find({
      where: {
        meetup: {
          id: meetupID
        }
      }
    });
    records.forEach(
      async (tag) => await this.meetupTagsRepository.delete(tag.id)
    );
  }
}
