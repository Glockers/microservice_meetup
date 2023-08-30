import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common';
import { RpcFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.useGlobalFilters(new RpcFilter());
  app.connectMicroservice(rmqService.getOptions('AUTH'));
  await app.startAllMicroservices();
}
bootstrap();
