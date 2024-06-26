import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetupRegistration } from '../../models';
import { Repository } from 'typeorm';
import { RegMeetupRequest } from '../../dto';
import { MeetupService } from '../meetup/meetup.service';

@Injectable()
export class RegistrationMeetupService {
  constructor(
    @InjectRepository(MeetupRegistration)
    private meetupRegistrationRepository: Repository<MeetupRegistration>,
    private meetupService: MeetupService
  ) {}

  async registrationOnMeetup(data: RegMeetupRequest) {
    const meetup = await this.meetupService.findById(data.meetupID);
    return await this.meetupRegistrationRepository.save({
      meetup,
      userID: data.userID
    });
  }

  async getAllMyRegMeetups(userID: number) {
    return await this.meetupRegistrationRepository.find({
      where: {
        userID: userID
      },
      relations: {
        meetup: true
      }
    });
  }
}
