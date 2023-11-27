import { RpcFilter } from '@app/common';
import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { REPORT_MEETUP_CSV, REPORT_MEETUP_PDF } from '../../constants';
import { ReportService } from './report.service';

@Controller()
@UseFilters(new RpcFilter())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @EventPattern(REPORT_MEETUP_PDF)
  async getReportMeetupPdf() {
    return await this.reportService.getPdfMeetups();
  }

  @EventPattern(REPORT_MEETUP_CSV)
  async getReportMeetupCsv() {
    return await this.reportService.getCsvMeetups();
  }
}
