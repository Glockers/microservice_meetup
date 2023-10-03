import { Module } from '@nestjs/common';
import { MeetupController } from './meetup.controller';
import { MeetupService } from './meetup.service';
import { SearchModule } from '../search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup, MeetupRegistration, Tag } from '../models';

@Module({
  imports: [
    SearchModule,
    TypeOrmModule.forFeature([Meetup, Tag, MeetupRegistration])
  ],
  controllers: [MeetupController],
  providers: [MeetupService],
  exports: [MeetupService]
})
export class MeetupModule {}
