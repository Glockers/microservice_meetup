import { Module } from '@nestjs/common';
import { MeetupController } from './meetup.controller';
import { MeetupService } from './meetup.service';
import { DatabaseConfigModule } from '../database.module';

@Module({
  imports: [DatabaseConfigModule],
  controllers: [MeetupController],
  providers: [MeetupService],
  exports: [MeetupService]
})
export class MeetupModule {}
