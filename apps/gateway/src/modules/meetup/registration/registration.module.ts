import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { AuthModule } from '../../auth';
import { RabbitmqModule } from '../helpers/rabbitmq.module';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [RegistrationService],
  controllers: [RegistrationController]
})
export class RegistrationModule {}
