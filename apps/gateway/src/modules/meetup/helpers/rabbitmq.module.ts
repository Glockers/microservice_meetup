import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RmqModule.register({
      name: 'MEETUP'
    })
  ],
  exports: [RmqModule]
})
export class RabbitmqModule {}
