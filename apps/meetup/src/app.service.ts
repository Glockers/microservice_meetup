import { Meetup } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import { UpdateMeetupRequest } from './dto/update-meetup.request';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Meetup)
    private meetupRepository: Repository<Meetup>
  ) {}

  async addMeetup(data: CreateMeetupRequest): Promise<void> {
    this.meetupRepository.save(data);
  }

  async getAllMeetups(): Promise<Meetup[]> {
    return this.meetupRepository.find();
  }

  async removeMeetupById(id: number): Promise<void> {
    console.log(id);
    const selectedMeetup = await this.findById(id);
    this.meetupRepository.delete(selectedMeetup);
  }

  async updateMeetup(data: UpdateMeetupRequest): Promise<void> {
    const { id, createMeetupRequest } = data;
    const user = await this.findById(id);
    Object.assign(user, createMeetupRequest);
    this.meetupRepository.save(user);
  }

  async findById(id: number): Promise<Meetup> {
    const selectedUser = await this.meetupRepository.findOneBy({
      id: id
    });
    if (!selectedUser) {
      throw new NotFoundException(`meetup with id ${id} not found`);
    }
    return selectedUser;
  }
}
