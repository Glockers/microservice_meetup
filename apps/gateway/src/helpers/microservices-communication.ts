import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export interface MicroservicesCommunicationConfig {
  client: ClientProxy;
}

export abstract class MicroservicesCommunicationHelper {
  private readonly client: ClientProxy;

  constructor(protected readonly config: MicroservicesCommunicationConfig) {
    this.client = config.client;
  }

  async sendToMicroservice<T>(endpoint: string, data: unknown) {
    return await lastValueFrom(this.client.send<T>(endpoint, data));
  }
}
