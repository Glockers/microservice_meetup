import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import { UpdateMeetupRequest } from '../dto/update-meetup.request';
import { lastValueFrom } from 'rxjs';
import { Meetup } from '@app/common';

// TODO допсать возвращаемые типы
@Injectable()
export class MeetupService {
  constructor(@Inject('meetup') private meetupClient: ClientProxy) {}

  async getAllMeetups() {
    return await lastValueFrom(
      this.meetupClient.send<Meetup[]>('meetup/getAllMeetups', {})
    );
  }

  async addMeetup(createdMeetupDTO: CreateMeetupRequest) {
    this.meetupClient.emit('meetup/addMeetup', { createdMeetupDTO });
  }

  removeMeetupById(id: number): void {
    this.meetupClient.emit('meetup/removeMeetupById', { id });
  }

  updateMeetup(updateMeetupRequest: UpdateMeetupRequest, id): void {
    this.meetupClient.emit('meetup/updateMeetup', { updateMeetupRequest, id });
  }
}
