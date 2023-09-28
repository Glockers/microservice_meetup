import { MicroservicesCommunicationHelper } from './../../../helpers';
import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { AuthModule } from '../../auth';
import { RabbitmqModule } from '../helpers/rabbitmq.module';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [MeetupService, MicroservicesCommunicationHelper],
  controllers: [MeetupController]
})
export class MeetupModule {}
