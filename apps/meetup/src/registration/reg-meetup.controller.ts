import { RpcFilter } from '@app/common';
import { Controller, UseFilters } from '@nestjs/common';
import { RegMeetupService } from './reg-meetup.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  REG_USER_ON_MEETUP,
  MY_REG_MEETUPS
} from '../constants/reg-meetup-endpoints';
import { RegMeetupRequest } from '../dto/reg-meetup.request';

@Controller()
@UseFilters(new RpcFilter())
export class RegMeetupController {
  constructor(private readonly regMeetupService: RegMeetupService) {}

  @EventPattern(REG_USER_ON_MEETUP)
  async regOnMeetup(@Payload() data: RegMeetupRequest) {
    const createdReg = await this.regMeetupService.addRegMeetup(data);
    return { result: true, createdReg };
  }

  @EventPattern(MY_REG_MEETUPS)
  async getMyMeetups(@Payload('userID') userID: number) {
    return await this.regMeetupService.getAllMyRegMeetups(userID); // TODO поменять
  }
}
