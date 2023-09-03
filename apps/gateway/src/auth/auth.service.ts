import { Inject, Injectable } from '@nestjs/common';
import { RegistrationRequest } from './dto/reg-request';
import { AuthRequest } from './dto/auth-request';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AUTH_LOGIN, AUTH_REG } from '../constants';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  async login(authRequest: AuthRequest) {
    return await lastValueFrom(
      this.authClient.send<any>(AUTH_LOGIN, { authRequest })
    );
  }

  async reg(registrationRequest: RegistrationRequest) {
    return await lastValueFrom(
      this.authClient.send(AUTH_REG, { registrationRequest })
    );
  }
}
