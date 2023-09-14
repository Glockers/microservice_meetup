import { Module } from '@nestjs/common';
import { RegMeetupController } from './reg-meetup.controller';
import { RegMeetupService } from './reg-meetup.service';
import { MeetupModule } from '../meetup/meetup.module';
import { DatabaseConfigModule } from '../database.module';

@Module({
  imports: [MeetupModule, DatabaseConfigModule],
  controllers: [RegMeetupController],
  providers: [RegMeetupService]
})
export class RegMeetupModule {}
