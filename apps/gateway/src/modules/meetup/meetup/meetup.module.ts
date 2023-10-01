import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { AuthModule } from '../../auth';
import { RabbitmqModule } from '../helpers/rabbitmq.module';
import { MeetupCommunication } from '../helpers';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [MeetupService, MeetupCommunication],
  controllers: [MeetupController]
})
export class MeetupModule {}
