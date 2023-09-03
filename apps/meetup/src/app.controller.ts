import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService, RpcFilter } from '@app/common';
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
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService
  ) {}

  @EventPattern(ADD_MEETUP)
  async addMeetup(
    @Payload('createdMeetupDTO') data: CreateMeetupRequest,
    @Ctx() context: RmqContext
  ) {
    await this.appService.addMeetup(data);
    this.rmqService.ack(context);
    return {};
  }

  @EventPattern(ALL_MEETUPS)
  async getAllMeetups(@Ctx() context: RmqContext): Promise<{
    meetups: Meetup[];
  }> {
    const meetups = await this.appService.getAllMeetups();
    this.rmqService.ack(context);
    return { meetups };
  }

  @EventPattern(REMOVE_MEETUP)
  async removeMeetupById(
    @Payload('id') id: number,
    @Ctx() context: RmqContext
  ) {
    this.appService.removeMeetupById(id);
    this.rmqService.ack(context);
    return {};
  }

  @EventPattern(UPDATE_MEETUP)
  async updateMeetup(
    @Payload('updateMeetupRequest') updateMeetupRequest: CreateMeetupRequest,
    @Payload('id') id: number,
    @Ctx() context: RmqContext
  ) {
    console.log(updateMeetupRequest);
    await this.appService.updateMeetup(updateMeetupRequest, id);
    this.rmqService.ack(context);
    return {};
  }
}
