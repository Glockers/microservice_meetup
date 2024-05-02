import {
  MY_REG_MEETUPS,
  REG_USER_ON_MEETUP
} from './../../../../../meetup/src/constants/reg-meetup-endpoints';
import { Injectable } from '@nestjs/common';
import { MeetupCommunication } from '../helpers';

@Injectable()
export class RegistrationService {
  constructor(private readonly meetupCommunication: MeetupCommunication) {}

  async registerOnMeetup(userID: number, meetupID: number) {
    return await this.meetupCommunication.sendToMicroservice(
      REG_USER_ON_MEETUP,
      { userID, meetupID }
    );
  }

  async getMyMeetups(userID: number) {
    return await this.meetupCommunication.sendToMicroservice(MY_REG_MEETUPS, {
      userID
    });
  }
}
