import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('meetup', true));
  await app.startAllMicroservices();
  logger.log('Meetup service is loading', 'Microservice');
}
bootstrap();
