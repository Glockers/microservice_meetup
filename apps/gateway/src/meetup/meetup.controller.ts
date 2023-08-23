import { Controller, Get, Patch, Post } from '@nestjs/common';
import { MeetupService } from './meetup.service';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get('/')
  getAllMeetups(): string {
    return this.meetupService.getAllMeetups();
  }

  @Post('/add')
  addMeetup(): string {
    return this.meetupService.addMeetup();
  }

  @Post('/remove')
  removeMeetupById(): string {
    return this.meetupService.removeMeetupById();
  }

  @Patch('/update')
  updateMeetup(): string {
    return this.meetupService.updateMeetup();
  }
}
