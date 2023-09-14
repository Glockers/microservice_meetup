import {
  ADD_MEETUP,
  ALL_MEETUPS,
  REMOVE_MEETUP,
  UPDATE_MEETUP
} from './../../../../../meetup/src/constants/meetup-endpoints';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Meetup } from 'apps/meetup/src/models';
import { CreateMeetupRequest } from '../dto/create-meetup.request';

@Injectable()
export class MeetupService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  async getAllMeetups() {
    return await lastValueFrom(
      this.meetupClient.send<Meetup[]>(ALL_MEETUPS, {})
    );
  }

  async addMeetup(createdMeetupDTO: CreateMeetupRequest) {
    return await lastValueFrom(
      this.meetupClient.send(ADD_MEETUP, { createdMeetupDTO })
    );
  }

  async removeMeetupById(id: number) {
    return await lastValueFrom(this.meetupClient.send(REMOVE_MEETUP, { id }));
  }

  async updateMeetup(updateMeetupRequest: CreateMeetupRequest, id) {
    return await lastValueFrom(
      this.meetupClient.send(UPDATE_MEETUP, { updateMeetupRequest, id })
    );
  }
}
