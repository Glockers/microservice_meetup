import { RpcFilter } from '@app/common';
import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { REPORT_MEETUP_PDF } from '../constants/meetup-endpoints';
import { ReportService } from './report.service';

@Controller()
@UseFilters(new RpcFilter())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @EventPattern(REPORT_MEETUP_PDF)
  async getReportMeetupPdf() {
    const tes = await this.reportService.getPdfMeetups();
    return tes;
  }
}
