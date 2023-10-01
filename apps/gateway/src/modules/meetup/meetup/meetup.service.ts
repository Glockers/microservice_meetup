import { Injectable } from '@nestjs/common';
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
import { MeetupCommunication } from '../helpers';

@Injectable()
export class MeetupService {
  constructor(private readonly meetupCommunication: MeetupCommunication) {}

  async getAllMeetups(params: LocationMeetupRequest) {
    return await this.meetupCommunication.sendToMicroservice<Meetup[]>(
      ALL_MEETUPS,
      { params }
    );
  }

  async addMeetup(createdMeetupDTO: CreateMeetupRequest) {
    return await this.meetupCommunication.sendToMicroservice(ADD_MEETUP, {
      createdMeetupDTO
    });
  }

  async removeMeetupById(id: number) {
    return await this.meetupCommunication.sendToMicroservice(REMOVE_MEETUP, {
      id
    });
  }

  async updateMeetup(updateMeetupRequest: CreateMeetupRequest, id) {
    return await this.meetupCommunication.sendToMicroservice(UPDATE_MEETUP, {
      updateMeetupRequest,
      id
    });
  }

  async searchMeetup(text: string) {
    return await this.meetupCommunication.sendToMicroservice(
      SMART_SEARCH_MEETUP,
      { text }
    );
  }
}
