import { Controller, UseFilters } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RpcFilter } from '@app/common';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import {
  ADD_MEETUP,
  ALL_MEETUPS,
  REMOVE_MEETUP,
  UPDATE_MEETUP
} from '../constants/meetup-endpoints';
import { Meetup } from '../models';
import { Cordinates } from '../dto/location-meetup.request';

@Controller()
@UseFilters(new RpcFilter())
export class MeetupController {
  constructor(private readonly appService: MeetupService) {}

  @EventPattern(ADD_MEETUP)
  async addMeetup(@Payload('createdMeetupDTO') data: CreateMeetupRequest) {
    await this.appService.addMeetup(data);
    return { result: true };
  }

  @EventPattern(ALL_MEETUPS)
  async getAllMeetups(@Payload('params') location: Cordinates): Promise<{
    meetups: Meetup[];
  }> {
    let meetups;
    if (location.lat && location.long) {
      meetups = await this.appService.getRange(location);
    } else {
      meetups = await this.appService.getAllMeetups();
    }
    return { meetups };
  }

  @EventPattern(REMOVE_MEETUP)
  async removeMeetupById(@Payload('id') id: number) {
    await this.appService.removeMeetupById(id);
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
