import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { AuthModule } from '../../auth';
import { RabbitmqModule } from '../rabbitmq.module';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [MeetupService],
  controllers: [MeetupController]
})
export class MeetupModule {}
