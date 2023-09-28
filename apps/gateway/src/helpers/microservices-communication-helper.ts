import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MicroservicesCommunicationHelper {
  async sendToMicroservice<T>(
    client: ClientProxy,
    endpoint: string,
    data: unknown
  ) {
    return await lastValueFrom(client.send<T>(endpoint, data));
  }
}
