import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationRequest } from './dto/reg-request';
import { AuthRequest } from './dto/auth-request';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, tap } from 'rxjs';
import { Tokens } from './interfaces';
import {
  AUTH_DECODE_AT,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_AT,
  AUTH_REFRESH_RT,
  AUTH_REG,
  AUTH_VALIDATE_AT
} from '../../constants';
import { TokenPayload } from '../../types';

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
    return await this.authClient.send(AUTH_LOGOUT, tokens);
  }

  async validateAt(tokens: Tokens) {
    return await lastValueFrom<boolean>(
      this.authClient.send(AUTH_VALIDATE_AT, tokens).pipe(
        tap((res) => {
          return of(res.accessDenied);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        })
      )
    );
  }

  async refreshRt(tokens: Tokens): Promise<Tokens> {
    return await lastValueFrom(this.authClient.send(AUTH_REFRESH_RT, tokens));
  }

  async refreshAt(tokens: Tokens) {
    return await lastValueFrom<Tokens>(
      this.authClient.send(AUTH_REFRESH_AT, tokens).pipe(
        tap(() => {
          return of(true);
        }),
        catchError((err) => {
          throw new UnauthorizedException(err);
        })
      )
    );
  }

  async decodeAt(at: string): Promise<TokenPayload> {
    return await lastValueFrom<TokenPayload>(
      this.authClient.send(AUTH_DECODE_AT, { at }).pipe(
        catchError((err) => {
          throw new UnauthorizedException(err);
        })
      )
    );
  }
}
