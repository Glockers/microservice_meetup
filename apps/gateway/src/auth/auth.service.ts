import { Inject, Injectable } from '@nestjs/common';
import { RegistrationRequest } from './dto/reg-request';
import { AuthRequest } from './dto/auth-request';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REFRESH, AUTH_REG } from '../constants';
import { Tokens } from './interfaces';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  async login(authRequest: AuthRequest): Promise<Tokens> {
    return await lastValueFrom(
      this.authClient.send<Tokens>(AUTH_LOGIN, { authRequest })
    );
  }

  async reg(registrationRequest: RegistrationRequest) {
    return await lastValueFrom(
      this.authClient.send(AUTH_REG, { registrationRequest })
    );
  }

  async logout(tokens: Tokens) {
    return this.authClient.emit(AUTH_LOGOUT, tokens);
  }

  async refresh(tokens: Tokens): Promise<Tokens> {
    return await lastValueFrom(this.authClient.send(AUTH_REFRESH, tokens));
  }
}
