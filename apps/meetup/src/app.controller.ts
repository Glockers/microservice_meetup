import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService
  ) {}

  @EventPattern('meetup/addMeetup')
  async addMeetup(@Payload() data: any, @Ctx() context: RmqContext) {
    this.appService.addMeetup(data);
    this.rmqService.ack(context);
  }

  @EventPattern('meetup/getAllMeetups')
  async getAllMeetups(@Ctx() context: RmqContext) {
    this.appService.getAllMeetups();
    this.rmqService.ack(context);
  }

  @EventPattern('meetup/removeMeetupById')
  async removeMeetupById(@Payload() data: any, @Ctx() context: RmqContext) {
    this.appService.removeMeetupById(data);
    this.rmqService.ack(context);
  }

  @EventPattern('meetup/updateMeetup')
  async updateMeetup(@Payload() data: any, @Ctx() context: RmqContext) {
    this.appService.updateMeetup(data);
    this.rmqService.ack(context);
  }
}
