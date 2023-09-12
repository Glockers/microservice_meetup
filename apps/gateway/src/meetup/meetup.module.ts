import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { RmqModule } from '@app/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RmqModule.register({
      name: 'MEETUP'
    })
  ],
  providers: [MeetupService],
  controllers: [MeetupController]
})
export class MeetupModule {}
