import { Module } from '@nestjs/common';
import { MeetupController } from './meetup.controller';
import { MeetupService } from './meetup.service';
import { DatabaseConfigModule } from '../database.module';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [DatabaseConfigModule, SearchModule],
  controllers: [MeetupController],
  providers: [MeetupService],
  exports: [MeetupService]
})
export class MeetupModule {}
