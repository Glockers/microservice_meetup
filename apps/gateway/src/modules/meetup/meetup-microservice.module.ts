import { Module } from '@nestjs/common';
import { MeetupModule } from './meetup/meetup.module';
import { ReportModule } from './report';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [MeetupModule, ReportModule, RegistrationModule]
})
export class MeetupMicroserviceModule {}
