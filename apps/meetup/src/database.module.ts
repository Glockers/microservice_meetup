import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup, MeetupRegistration, Tags } from './models';

@Module({
  imports: [
    DatabaseModule.addEntities([Meetup, Tags, MeetupRegistration]),
    TypeOrmModule.forFeature([Meetup, Tags, MeetupRegistration])
  ],
  exports: [DatabaseConfigModule, TypeOrmModule]
})
export class DatabaseConfigModule {}
