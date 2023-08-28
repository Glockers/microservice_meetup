import { Meetup } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Meetup)
    private meetupRepository: Repository<Meetup>
  ) {}

  async addMeetup(data: any) {
    this.meetupRepository.save(data);
  }

  async getAllMeetups() {
    return this.meetupRepository.find();
  }

  async removeMeetupById(meetup: Meetup) {
    const selectedMeetup = await this.findById(meetup.id);
    this.meetupRepository.delete(selectedMeetup);
  }

  async updateMeetup(data: any) {
    const { id, updateMeetupRequest } = data;
    const user = await this.findById(id);
    Object.assign(user, updateMeetupRequest);
    this.meetupRepository.save(user);
  }

  async findById(id: number) {
    const selectedUser = await this.meetupRepository.findOneBy({
      id: id
    });
    if (!selectedUser) {
      // Обработка, если пользователь не найден
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return selectedUser;
  }
}
