import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule, Meetup, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { mergedConfigValidationSchema } from './config/main.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/meetup/.env'
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Meetup])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
