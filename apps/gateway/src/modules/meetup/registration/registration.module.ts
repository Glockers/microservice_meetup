import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { AuthModule } from '../../auth/auth.module';
import { RabbitmqModule } from '../helpers/rabbitmq.module';
import { MeetupCommunication } from '../helpers';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [RegistrationService, MeetupCommunication],
  controllers: [RegistrationController]
})
export class RegistrationModule {}
