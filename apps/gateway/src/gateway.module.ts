import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { MeetupModule } from './meetup/meetup.module';
import { mergedConfigValidationSchema } from './config/main.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/gateway/.env'
    }),
    AuthModule,
    MeetupModule
    // DatabaseModule
  ]
})
export class GatewayModule {}
