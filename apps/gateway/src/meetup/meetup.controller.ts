import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  async getAllMeetups() {
    return await this.meetupService.getAllMeetups();
  }

  @Post('/add')
  async addMeetup(@Body() createdMeetupDTO: CreateMeetupRequest) {
    return await this.meetupService.addMeetup(createdMeetupDTO);
  }

  @Delete('/remove/:id')
  removeMeetupById(@Param('id', ParseIntPipe) id: number): void {
    return this.meetupService.removeMeetupById(id);
  }

  @Patch('/update/:id')
  updateMeetup(
    @Body() updateMeetupRequest: UpdateMeetupRequest,
    @Param('id', ParseIntPipe) id: number
  ): void {
    return this.meetupService.updateMeetup(updateMeetupRequest, id);
  }
}
