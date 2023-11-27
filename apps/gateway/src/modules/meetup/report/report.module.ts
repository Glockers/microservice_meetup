import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthModule } from '../../auth';
import { RabbitmqModule } from '../helpers/rabbitmq.module';
import { MeetupCommunication } from '../helpers';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [ReportService, MeetupCommunication],
  controllers: [ReportController]
})
export class ReportModule {}
