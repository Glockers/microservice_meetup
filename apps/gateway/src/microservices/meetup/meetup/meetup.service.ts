import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Meetup } from 'apps/meetup/src/models';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import {
  ADD_MEETUP,
  ALL_MEETUPS,
  REMOVE_MEETUP,
  SMART_SEARCH_MEETUP,
  UPDATE_MEETUP
} from 'apps/gateway/src/constants';
import { LocationMeetupRequest } from '../dto/location-meetup.request';

@Injectable()
export class MeetupService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  async getAllMeetups(params: LocationMeetupRequest) {
    return await lastValueFrom(
      this.meetupClient.send<Meetup[]>(ALL_MEETUPS, { params })
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

  async searchMeetup(text: string) {
    return await lastValueFrom(
      this.meetupClient.send(SMART_SEARCH_MEETUP, { text })
    );
  }
}
