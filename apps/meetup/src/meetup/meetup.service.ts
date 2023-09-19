import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import { RpcException } from '@nestjs/microservices';
import { Meetup, Tags } from '../models';
import { SearchService } from '../search/search.service';

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
    const filteredData = {
      ...data,
      tags: undefined
    } as Meetup;
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

  async removeMeetupById(id: number) {
    const selectedMeetup = await this.findById(id);
    await this.meetupRepository.delete(selectedMeetup);
    this.searchService.delete(7);
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
    records.forEach(async (tag) => await this.meetupTagsRepository.delete(tag));
  }
}
