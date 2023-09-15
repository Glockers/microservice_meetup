import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REPORT_MEETUP_PDF } from '../../../constants/meetup-endpoints';
import { deserializeUint8Array } from '@app/common';

@Injectable()
export class ReportService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  async getPdf() {
    const base64String = await this.meetupClient
      .send<string>(REPORT_MEETUP_PDF, {})
      .toPromise();
    return deserializeUint8Array(base64String);
  }
}
