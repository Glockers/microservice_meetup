import {
  MY_REG_MEETUPS,
  REG_USER_ON_MEETUP
} from './../../../../../meetup/src/constants/reg-meetup-endpoints';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RegistrationService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  async registerOnMeetup(userID: number, meetupID: number) {
    return await lastValueFrom(
      this.meetupClient.send(REG_USER_ON_MEETUP, { userID, meetupID })
    );
  }

  async getMyMeetups(userID: number) {
    return await lastValueFrom(
      this.meetupClient.send(MY_REG_MEETUPS, { userID })
    );
  }
}
