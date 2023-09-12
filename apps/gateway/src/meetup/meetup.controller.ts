import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UsePipes
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import {
  createMeetupRequestSchema,
  updateMeetupRequestSchema
} from './schemas';
import { JoiValidationPipe } from '../helpers';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';
import { HttpExceptionFilter } from '../filters/controller.filter';

@Controller('meetup')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get('/')
  async getAllMeetups() {
    return await this.meetupService.getAllMeetups();
  }

  @Post('/add')
  @UsePipes(new JoiValidationPipe(createMeetupRequestSchema))
  async addMeetup(@Body() createdMeetupDTO: CreateMeetupRequest) {
    await this.meetupService.addMeetup(createdMeetupDTO);

    return {
      status: HttpStatus.OK,
      text: 'Meetup add'
    };
  }

  @Delete('/remove/:id')
  async removeMeetupById(@Param('id', ParseIntPipe) id: number) {
    await this.meetupService.removeMeetupById(id);

    return {
      status: HttpStatus.OK,
      text: 'Meetup was deleted'
    };
  }

  @Patch('/update/:id')
  async updateMeetup(
    @Body(new JoiValidationPipe(updateMeetupRequestSchema))
    updateMeetupRequest: CreateMeetupRequest,
    @Param('id', ParseIntPipe) id: number
  ) {
    await this.meetupService.updateMeetup(updateMeetupRequest, id);

    return {
      status: HttpStatus.OK,
      text: 'Meetup was updated'
    };
  }
}
