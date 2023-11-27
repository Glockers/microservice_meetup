import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { RabbitmqModule } from '../helpers';
import { MeetupCommunication } from '../helpers';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [MeetupService, MeetupCommunication],
  controllers: [MeetupController]
})
export class MeetupModule {}
