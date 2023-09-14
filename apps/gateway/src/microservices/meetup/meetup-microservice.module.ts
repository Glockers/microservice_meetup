import { Module } from '@nestjs/common';
import { MeetupModule } from './meetup';
import { ReportModule } from './report';
import { RegModule } from './registration';

@Module({
  imports: [MeetupModule, ReportModule, RegModule]
})
export class MeetupMicroserviceModule {}
