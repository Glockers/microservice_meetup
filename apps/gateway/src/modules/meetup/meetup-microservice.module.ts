import { Module } from '@nestjs/common';
import { MeetupModule } from './meetup';
import { ReportModule } from './report';
import { RegistrationModule } from './registration';

@Module({
  imports: [MeetupModule, ReportModule, RegistrationModule]
})
export class MeetupMicroserviceModule {}
