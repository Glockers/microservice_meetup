import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MeetupService {
  constructor(@Inject('meetup') private meetupClient: ClientProxy) {}

  getAllMeetups(): string {
    return 'get all meetups';
  }

  addMeetup(): string {
    return 'add meetup';
  }

  removeMeetupById(): string {
    return 'get all meetups';
  }

  updateMeetup(): string {
    return 'get all meetups';
  }
}
