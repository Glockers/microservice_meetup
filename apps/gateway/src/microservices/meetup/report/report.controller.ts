import { HttpExceptionFilter } from './../../../filters/controller.filter';
import {
  Controller,
  Get,
  Header,
  StreamableFile,
  UseFilters
} from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('meetup/report')
@UseFilters(new HttpExceptionFilter())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('/pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  async getPdfReport() {
    const pdfBytes = await this.reportService.getPdf();
    return new StreamableFile(pdfBytes);
  }
  @Get('/csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=meetups.csv')
  async getCsvReport() {
    return await this.reportService.getCsv();
  }

  @Get('/test')
  async test() {
    return true;
  }
}
