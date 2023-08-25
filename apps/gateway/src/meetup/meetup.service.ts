import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import { UpdateMeetupRequest } from '../dto/update-meetup.request';

@Injectable()
export class MeetupService {
  constructor(@Inject('meetup') private meetupClient: ClientProxy) {}

  getAllMeetups(): void {
    this.meetupClient.emit('meetup/getAllMeetups', {});
  }

  addMeetup(createdMeetupDTO: CreateMeetupRequest): void {
    this.meetupClient.emit('meetup/addMeetup', { createdMeetupDTO });
  }

  removeMeetupById(id: number): void {
    this.meetupClient.emit('meetup/removeMeetupById', { id });
  }

  updateMeetup(updateMeetupRequest: UpdateMeetupRequest): void {
    this.meetupClient.emit('meetup/updateMeetup', { updateMeetupRequest });
  }
}
