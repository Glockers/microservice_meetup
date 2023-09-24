import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mergedConfigValidationSchema } from './config';
import { MeetupMicroserviceModule } from './modules/meetup';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/gateway/.env'
    }),
    AuthModule,
    MeetupMicroserviceModule
  ]
})
export class GatewayModule {}
