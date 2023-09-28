import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { mergedConfigValidationSchema } from './schemas/main';
import { MeetupModule } from './meetup/meetup.module';
import { RegistrationMeetupModule } from './registration/reg-meetup.module';
import { ReportModule } from './report/report.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MeetupModule,
    RegistrationMeetupModule,
    ReportModule,
    RmqModule,
    SearchModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/meetup/.env'
    })
  ]
})
export class AppModule {}
