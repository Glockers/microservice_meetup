import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupRequest } from './dto/create-meetup.request';
import {
  createMeetupRequestSchema,
  updateMeetupRequestSchema
} from './schemas';
import { JoiValidationPipe } from '../helpers';
import { AuthGuard } from '../guards/auth.guard';

@Controller('meetup')
@UseGuards(AuthGuard)
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get('/')
  async getAllMeetups() {
    return await this.meetupService.getAllMeetups();
  }

  @Post('/add')
  @UsePipes(new JoiValidationPipe(createMeetupRequestSchema))
  async addMeetup(@Body() createdMeetupDTO: CreateMeetupRequest) {
    try {
      return await this.meetupService.addMeetup(createdMeetupDTO);
    } catch (err) {
      throw new HttpException(err, err.code);
    }
  }

  @Delete('/remove/:id')
  async removeMeetupById(@Param('id', ParseIntPipe) id: number) {
    return await this.meetupService.removeMeetupById(id);
  }

  @Patch('/update/:id')
  async updateMeetup(
    @Body(new JoiValidationPipe(updateMeetupRequestSchema))
    updateMeetupRequest: CreateMeetupRequest,
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.meetupService.updateMeetup(updateMeetupRequest, id);
  }
}
