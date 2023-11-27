import { RpcFilter } from '@app/common';
import { Controller, UseFilters } from '@nestjs/common';
import { RegistrationMeetupService } from './reg-meetup.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { REG_USER_ON_MEETUP, MY_REG_MEETUPS } from '../../constants';
import { RegMeetupRequest } from '../../dto';

@Controller()
@UseFilters(new RpcFilter())
export class RegistrationMeetupController {
  constructor(
    private readonly registrationMeetupService: RegistrationMeetupService
  ) {}

  @EventPattern(REG_USER_ON_MEETUP)
  async registrationOnMeetup(@Payload() data: RegMeetupRequest) {
    const createdReg =
      await this.registrationMeetupService.registrationOnMeetup(data);
    return { result: true, createdReg };
  }

  @EventPattern(MY_REG_MEETUPS)
  async getMyMeetups(@Payload('userID') userID: number) {
    return await this.registrationMeetupService.getAllMyRegMeetups(userID);
  }
}
