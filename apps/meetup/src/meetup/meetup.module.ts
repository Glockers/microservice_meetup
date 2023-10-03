import { Module } from '@nestjs/common';
import { MeetupController } from './meetup.controller';
import { MeetupService } from './meetup.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [MeetupController],
  providers: [MeetupService],
  exports: [MeetupService]
})
export class MeetupModule {}
