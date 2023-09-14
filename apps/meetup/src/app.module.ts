import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { mergedConfigValidationSchema } from './schemas/main';
import { MeetupModule } from './meetup/meetup.module';
import { RegMeetupModule } from './registration/reg-meetup.module';

@Module({
  imports: [
    MeetupModule,
    RegMeetupModule,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/meetup/.env'
    })
  ]
})
export class AppModule {}
