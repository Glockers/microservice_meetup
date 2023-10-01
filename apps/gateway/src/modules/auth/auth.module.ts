import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/common';
import { AuthCommunication } from './helpers/auth-communication';
import { CookieHelper } from '../../helpers';

@Module({
  imports: [
    RmqModule.register({
      name: 'AUTH'
    })
  ],
  providers: [AuthService, AuthCommunication, CookieHelper],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
