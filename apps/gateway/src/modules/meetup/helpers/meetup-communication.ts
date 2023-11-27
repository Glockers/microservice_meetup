import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroservicesCommunicationHelper } from 'apps/gateway/src/helpers';

@Injectable()
export class MeetupCommunication extends MicroservicesCommunicationHelper {
  constructor(@Inject('MEETUP') meetupClient: ClientProxy) {
    super({
      client: meetupClient
    });
  }
}
