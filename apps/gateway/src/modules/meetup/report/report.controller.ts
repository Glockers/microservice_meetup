import { HttpExceptionFilter } from './../../../filters/controller.filter';
import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Query,
  StreamableFile,
  UseFilters
} from '@nestjs/common';
import { ReportService } from './report.service';
import { FileType } from 'apps/gateway/src/types';

@Controller('meetup/report')
@UseFilters(new HttpExceptionFilter())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async getReport(@Query('type') type: FileType) {
    switch (type) {
      case FileType.PDF:
        return await this.getPdfReport();
      case FileType.CSV:
        return await this.getCsvReport();
      default:
        throw new BadRequestException('Invalid or missing "type" parameter');
    }
  }

  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  async getPdfReport() {
    const pdfBytes = await this.reportService.getPdf();
    return new StreamableFile(pdfBytes);
  }

  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=meetups.csv')
  async getCsvReport() {
    return await this.reportService.getCsv();
  }
}
