import { Injectable } from '@nestjs/common';
import {
  REPORT_MEETUP_CSV,
  REPORT_MEETUP_PDF
} from '../../../constants/meetup-endpoints';
import { deserializeUint8Array } from '@app/common';
import { MeetupCommunication } from '../helpers';

@Injectable()
export class ReportService {
  constructor(private readonly meetupCommunication: MeetupCommunication) {}

  async getPdf() {
    const base64String =
      await this.meetupCommunication.sendToMicroservice<string>(
        REPORT_MEETUP_PDF,
        {}
      );
    return deserializeUint8Array(base64String);
  }

  async getCsv() {
    return await this.meetupCommunication.sendToMicroservice(
      REPORT_MEETUP_CSV,
      {}
    );
  }
}
