import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RpcFilter } from '@app/common';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import {
  ADD_MEETUP,
  ALL_MEETUPS,
  REMOVE_MEETUP,
  UPDATE_MEETUP
} from './constants/meetup-endpoints';
import { Meetup } from './models';

@Controller()
@UseFilters(new RpcFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(ADD_MEETUP)
  async addMeetup(@Payload('createdMeetupDTO') data: CreateMeetupRequest) {
    await this.appService.addMeetup(data);
    return { result: true };
  }

  @EventPattern(ALL_MEETUPS)
  async getAllMeetups(): Promise<{
    meetups: Meetup[];
  }> {
    const meetups = await this.appService.getAllMeetups();
    return { meetups };
  }

  @EventPattern(REMOVE_MEETUP)
  async removeMeetupById(@Payload('id') id: number) {
    this.appService.removeMeetupById(id);
    return { result: true };
  }

  @EventPattern(UPDATE_MEETUP)
  async updateMeetup(
    @Payload('updateMeetupRequest') updateMeetupRequest: CreateMeetupRequest,
    @Payload('id') id: number
  ) {
    await this.appService.updateMeetup(updateMeetupRequest, id);
    return { result: true };
  }
}
