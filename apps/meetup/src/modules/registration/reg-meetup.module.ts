import { Module } from '@nestjs/common';
import { RegistrationMeetupController } from './reg-meetup.controller';
import { RegistrationMeetupService } from './reg-meetup.service';
import { MeetupModule } from '../meetup/meetup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup, MeetupRegistration, Tag } from '../../models';

@Module({
  imports: [
    MeetupModule,
    TypeOrmModule.forFeature([Meetup, Tag, MeetupRegistration])
  ],
  controllers: [RegistrationMeetupController],
  providers: [RegistrationMeetupService]
})
export class RegistrationMeetupModule {}
