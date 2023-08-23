import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  console.log('Gateway service started!');
  await app.listen(3000);
}
bootstrap();
