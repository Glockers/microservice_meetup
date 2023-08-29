import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Meetup, RmqService } from '@app/common';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import { UpdateMeetupRequest } from './dto/update-meetup.request';
import { IdRequest } from './dto/id-request';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService
  ) {}

  @EventPattern('meetup/addMeetup')
  async addMeetup(
    @Payload() data: CreateMeetupRequest,
    @Ctx() context: RmqContext
  ) {
    this.appService.addMeetup(data);
    this.rmqService.ack(context);
  }

  @EventPattern('meetup/getAllMeetups')
  async getAllMeetups(@Ctx() context: RmqContext): Promise<{
    meetups: Meetup[];
  }> {
    const meetups = await this.appService.getAllMeetups();
    this.rmqService.ack(context);
    return { meetups };
  }

  @EventPattern('meetup/removeMeetupById')
  async removeMeetupById(
    @Payload() data: IdRequest,
    @Ctx() context: RmqContext
  ): Promise<void> {
    const { id } = data;
    this.appService.removeMeetupById(id);
    this.rmqService.ack(context);
  }

  @EventPattern('meetup/updateMeetup')
  async updateMeetup(
    @Payload() data: UpdateMeetupRequest,
    @Ctx() context: RmqContext
  ): Promise<void> {
    this.appService.updateMeetup(data);
    this.rmqService.ack(context);
  }
}
