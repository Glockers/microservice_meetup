import { Meetup } from '@app/common';
import { Injectable } from '@nestjs/common';
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
    console.log(this.meetupRepository.find());
  }

  async removeMeetupById(meetup: Meetup) {
    const selectedMeetup = await this.findById(meetup.id);
    this.meetupRepository.delete(selectedMeetup);
  }

  async updateMeetup(data: any) {
    console.log(data); // TODO
  }

  async findById(id: number) {
    return await this.meetupRepository.findOneBy({
      id: id
    });
  }
}
