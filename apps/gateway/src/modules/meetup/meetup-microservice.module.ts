import { Module } from '@nestjs/common';
import { MeetupModule } from './meetup';
import { ReportModule } from './report';
import { RegistrationModule } from './registration';
import { MicroservicesCommunicationHelper } from '../../helpers';

@Module({
  imports: [MeetupModule, ReportModule, RegistrationModule],
  providers: [MicroservicesCommunicationHelper]
})
export class MeetupMicroserviceModule {}
