import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MeetupModule } from './meetup/meetup.module';
import { mergedConfigValidationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/gateway/.env'
    }),
    AuthModule,
    MeetupModule
  ]
})
export class GatewayModule {}
