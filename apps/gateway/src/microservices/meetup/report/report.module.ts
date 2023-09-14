import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthModule } from '../../auth';

@Module({
  imports: [AuthModule],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
