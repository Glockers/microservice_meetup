import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule.register({
      name: 'meetup'
    })
  ],
  providers: [MeetupService],
  controllers: [MeetupController]
})
export class MeetupModule {}
