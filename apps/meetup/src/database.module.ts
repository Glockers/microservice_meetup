import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup, MeetupRegistration, Tag } from './models';

@Module({
  imports: [
    DatabaseModule.addEntities([Meetup, Tag, MeetupRegistration]),
    TypeOrmModule.forFeature([Meetup, Tag, MeetupRegistration])
  ],
  exports: [DatabaseConfigModule, TypeOrmModule]
})
export class DatabaseConfigModule {}
