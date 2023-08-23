import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule.register({
      name: 'auth'
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
