import { Inject, Injectable } from '@nestjs/common';
import { RegistrationRequest } from './dto/reg-request';
import { AuthRequest } from './dto/auth-request';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  async login(authRequest: AuthRequest) {
    try {
      console.log('gateway', authRequest);
      return await lastValueFrom(
        this.authClient.send<any>('auth/login', { authRequest })
      );
    } catch (err) {
      console.error(err);
    }
  }

  async reg(registrationRequest: RegistrationRequest) {
    this.authClient.emit('auth/reg', { registrationRequest });
  }
}
