import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { mergedConfigValidationSchema } from './schemas/main';
import { MeetupModule } from './modules/meetup/meetup.module';
import { RegistrationMeetupModule } from './modules/registration/reg-meetup.module';
import { ReportModule } from './modules/report/report.module';
import { SearchModule } from './modules/search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
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
