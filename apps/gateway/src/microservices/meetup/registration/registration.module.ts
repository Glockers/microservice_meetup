import { Module } from '@nestjs/common';
import { RegService } from './registration.service';
import { RegController } from './registration.controller';
import { AuthModule } from '../../auth';
import { RabbitmqModule } from '../rabbitmq.module';

@Module({
  imports: [AuthModule, RabbitmqModule],
  providers: [RegService],
  controllers: [RegController]
})
export class RegModule {}
