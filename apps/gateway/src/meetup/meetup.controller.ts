import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import { JoiValidationPipe } from '@app/common';
import {
  createMeetupRequestSchema,
  updateMeetupRequestSchema
} from './schemas';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get('/')
  async getAllMeetups() {
    return await this.meetupService.getAllMeetups();
  }

  @Post('/add')
  @UsePipes(new JoiValidationPipe(createMeetupRequestSchema))
  async addMeetup(@Body() createdMeetupDTO: CreateMeetupRequest) {
    return await this.meetupService.addMeetup(createdMeetupDTO);
  }

  @Delete('/remove/:id')
  removeMeetupById(@Param('id', ParseIntPipe) id: number): void {
    return this.meetupService.removeMeetupById(id);
  }

  @Patch('/update/:id')
  @UsePipes(new JoiValidationPipe(updateMeetupRequestSchema))
  updateMeetup(
    @Body() updateMeetupRequest: CreateMeetupRequest,
    @Param('id', ParseIntPipe) id: number
  ): void {
    return this.meetupService.updateMeetup(updateMeetupRequest, id);
  }
}
