import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import { lastValueFrom } from 'rxjs';
import {
  ADD_MEETUP,
  ALL_MEETUPS,
  REMOVE_MEETUP,
  UPDATE_MEETUP
} from '../constants';
import { Meetup } from 'apps/meetup/src/models';

// TODO допсать возвращаемые типы
@Injectable()
export class MeetupService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  async getAllMeetups() {
    return await lastValueFrom(
      this.meetupClient.send<Meetup[]>(ALL_MEETUPS, {})
    );
  }

  async addMeetup(createdMeetupDTO: CreateMeetupRequest) {
    try {
      await lastValueFrom(
        this.meetupClient.send(ADD_MEETUP, { createdMeetupDTO })
      );
    } catch (err) {
      console.log(err);
    }
  }

  async removeMeetupById(id: number) {
    await lastValueFrom(this.meetupClient.send(REMOVE_MEETUP, { id }));
  }

  async updateMeetup(updateMeetupRequest: CreateMeetupRequest, id) {
    await lastValueFrom(
      this.meetupClient.send(UPDATE_MEETUP, { updateMeetupRequest, id })
    );
  }
}
