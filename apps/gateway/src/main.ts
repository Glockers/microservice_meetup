import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.use(cookieParser());
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  await app.listen(configService.get('PORT'));
}
bootstrap();
