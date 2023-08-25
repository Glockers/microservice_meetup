import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import { UpdateMeetupRequest } from '../dto/update-meetup.request';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get('/')
  getAllMeetups(): void {
    return this.meetupService.getAllMeetups();
  }

  @Post('/add')
  addMeetup(@Body() createdMeetupDTO: CreateMeetupRequest): void {
    return this.meetupService.addMeetup(createdMeetupDTO);
  }

  @Delete('/remove/:id')
  removeMeetupById(@Param('id') id: number): void {
    return this.meetupService.removeMeetupById(id);
  }

  @Patch('/update')
  updateMeetup(@Body() updateMeetupRequest: UpdateMeetupRequest): void {
    return this.meetupService.updateMeetup(updateMeetupRequest);
  }
}
