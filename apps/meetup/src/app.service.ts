import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import { RpcException } from '@nestjs/microservices';
import { Meetup } from './models';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Meetup)
    private meetupRepository: Repository<Meetup>
  ) {}

  async addMeetup(data: CreateMeetupRequest): Promise<void> {
    await this.meetupRepository.save(data);
  }

  async getAllMeetups(): Promise<Meetup[]> {
    return await this.meetupRepository.find();
  }

  async removeMeetupById(id: number): Promise<void> {
    const selectedMeetup = await this.findById(id);
    await this.meetupRepository.delete(selectedMeetup);
  }

  async updateMeetup(
    updateMeetupRequest: CreateMeetupRequest,
    id: number
  ): Promise<void> {
    const user = await this.findById(id);
    Object.assign(user, updateMeetupRequest);
    await this.meetupRepository.save(user);
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
}
