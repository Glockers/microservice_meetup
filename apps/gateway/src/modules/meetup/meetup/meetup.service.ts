import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
import { MicroservicesCommunicationHelper } from 'apps/gateway/src/helpers';

@Injectable()
export class MeetupService {
  constructor(
    private microservicesCommunicationHelper: MicroservicesCommunicationHelper,
    @Inject('MEETUP') private meetupClient: ClientProxy
  ) {}

  async getAllMeetups(params: LocationMeetupRequest) {
    return await this.microservicesCommunicationHelper.sendToMicroservice<
      Meetup[]
    >(this.meetupClient, ALL_MEETUPS, { params });
  }

  async addMeetup(createdMeetupDTO: CreateMeetupRequest) {
    return await this.microservicesCommunicationHelper.sendToMicroservice(
      this.meetupClient,
      ADD_MEETUP,
      { createdMeetupDTO }
    );
  }

  async removeMeetupById(id: number) {
    return await this.microservicesCommunicationHelper.sendToMicroservice(
      this.meetupClient,
      REMOVE_MEETUP,
      { id }
    );
  }

  async updateMeetup(updateMeetupRequest: CreateMeetupRequest, id) {
    return await this.microservicesCommunicationHelper.sendToMicroservice(
      this.meetupClient,
      UPDATE_MEETUP,
      { updateMeetupRequest, id }
    );
  }

  async searchMeetup(text: string) {
    return await this.microservicesCommunicationHelper.sendToMicroservice(
      this.meetupClient,
      SMART_SEARCH_MEETUP,
      { text }
    );
  }
}
