import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroservicesCommunicationHelper } from 'apps/gateway/src/helpers';

@Injectable()
export class AuthCommunication extends MicroservicesCommunicationHelper {
  constructor(@Inject('AUTH') authClient: ClientProxy) {
    super({
      client: authClient
    });
  }
}
