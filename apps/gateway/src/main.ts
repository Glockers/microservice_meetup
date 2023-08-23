import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  // app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  // app.enableCors();
  await app.listen(configService.get('PORT'));
}
bootstrap();
