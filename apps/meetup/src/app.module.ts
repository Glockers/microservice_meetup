import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { mergedConfigValidationSchema } from './schemas/main';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meetup } from './models/meetup.entity';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/meetup/.env'
    }),
    DatabaseModule.addEntities([Meetup]),
    TypeOrmModule.forFeature([Meetup])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
