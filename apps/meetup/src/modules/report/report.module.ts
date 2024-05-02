import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MeetupModule } from '../meetup/meetup.module';

@Module({
  imports: [MeetupModule],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
