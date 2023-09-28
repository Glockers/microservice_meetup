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
  Query,
  UseFilters,
  UsePipes
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupRequest } from '../dto/create-meetup.request';
import {
  createMeetupRequestSchema,
  updateMeetupRequestSchema
} from '../schemas';
import { JoiValidationPipe } from '../../../helpers';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../guards';
import { HttpExceptionFilter } from '../../../filters/controller.filter';
import { LocationMeetupRequest } from '../dto/location-meetup.request';

@Controller('meetup')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get('/')
  async getAllMeetups(@Query() params: LocationMeetupRequest) {
    return await this.meetupService.getAllMeetups(params);
  }

  @Post('/')
  @UsePipes(new JoiValidationPipe(createMeetupRequestSchema))
  async addMeetup(@Body() createdMeetupDTO: CreateMeetupRequest) {
    await this.meetupService.addMeetup(createdMeetupDTO);
    return {
      status: HttpStatus.OK,
      text: 'Meetup add'
    };
  }

  @Delete('/:id')
  async removeMeetupById(@Param('id', ParseIntPipe) id: number) {
    await this.meetupService.removeMeetupById(id);

    return {
      status: HttpStatus.OK,
      text: 'Meetup was deleted'
    };
  }

  @Patch('/:id')
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

  @Get('/search')
  async searchMeetup(@Query('text') text: string) {
    const meetups = await this.meetupService.searchMeetup(text);
    return {
      status: HttpStatus.OK,
      meetups
    };
  }
}
