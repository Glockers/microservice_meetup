import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import { RpcException } from '@nestjs/microservices';
import { Meetup, Tag } from '../models';
import { SearchService } from '../search/search.service';
import { Point } from 'geojson';
import { Cordinates } from '../dto/location-meetup.request';

@Injectable()
export class MeetupService {
  constructor(
    private searchService: SearchService,
    @InjectRepository(Meetup)
    private meetupRepository: Repository<Meetup>
  ) {}

  async addMeetup(data: CreateMeetupRequest): Promise<Meetup> {
    const pointObject: Point = {
      type: 'Point',
      coordinates: [data.lat, data.long]
    };

    const tags = data.tags.map((name) => {
      const tag = new Tag();
      tag.name = name;
      return tag;
    });

    const filteredData = {
      ...data,
      location: pointObject,
      tags
    };
    const meetup = await this.meetupRepository.save(filteredData);
    this.searchService.indexMeetup(meetup);
    return meetup;
  }

  async getMeetups(): Promise<Meetup[]> {
    return await this.searchService.getAllRecords();
  }

  async getRange(location: Cordinates) {
    const origin: Point = {
      type: 'Point',
      coordinates: [location.long, location.lat]
    };

    return await this.meetupRepository
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
  }

  async removeMeetupById(id: number) {
    const selectedMeetup = await this.findById(id);
    await this.meetupRepository.delete(selectedMeetup.id);
    return await this.searchService.delete(selectedMeetup.id);
  }

  async updateMeetup(updateMeetupRequest: CreateMeetupRequest, id: number) {
    const meetup = await this.findById(id);
    if (updateMeetupRequest.tags && updateMeetupRequest.tags.length !== 0) {
      meetup.tags = updateMeetupRequest.tags.map((name) => {
        const tag = new Tag();
        tag.name = name;
        return tag;
      });
    }

    const updatedMeetup = {
      ...meetup,
      updateMeetupRequest,
      ...meetup.tags
    };
    await this.meetupRepository.save(updatedMeetup);
    this.searchService.update(updatedMeetup);
    return updatedMeetup;
  }

  async findById(id: number): Promise<Meetup> {
    const selectedMeetup = await this.meetupRepository.findOneBy({
      id: id
    });
    if (!selectedMeetup) {
      throw new RpcException(
        new NotFoundException(`meetup with id ${id} not found`)
      );
    }
    return selectedMeetup;
  }
}
