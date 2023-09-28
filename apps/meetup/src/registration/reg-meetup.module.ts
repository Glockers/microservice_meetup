import { Module } from '@nestjs/common';
import { RegistrationMeetupController } from './reg-meetup.controller';
import { RegistrationMeetupService } from './reg-meetup.service';
import { MeetupModule } from '../meetup/meetup.module';
import { DatabaseConfigModule } from '../database.module';

@Module({
  imports: [MeetupModule, DatabaseConfigModule],
  controllers: [RegistrationMeetupController],
  providers: [RegistrationMeetupService]
})
export class RegistrationMeetupModule {}
