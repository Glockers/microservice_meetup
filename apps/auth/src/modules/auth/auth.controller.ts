import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RpcFilter } from '@app/common';
import {
  AUTH_DECODE_AT,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_AT,
  AUTH_REFRESH_RT,
  AUTH_REG,
  AUTH_VALIDATE_AT
} from '../../constants';
import { AuthService } from './auth.service';
import { AuthenticationJwtService } from './authentication-jwt.service';
import { AuthRequest, RegistrationRequest } from '../../dto';
import { TokenTypeEnum, Tokens } from '../../types';
import { TokenPayload } from '../../types/payload.type';

@Controller()
@UseFilters(new RpcFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private authenticationJwtService: AuthenticationJwtService
  ) {}

  @EventPattern(AUTH_LOGIN)
  async login(@Payload('authRequest') data: AuthRequest): Promise<Tokens> {
    return await this.authService.login(data);
  }

  @EventPattern(AUTH_REG)
  async reg(@Payload('registrationRequest') data: RegistrationRequest) {
    await this.authService.reg(data);
    return { result: true };
  }

  @EventPattern(AUTH_LOGOUT)
  async logout(@Payload() tokens: Tokens) {
    await this.authService.logout(tokens);
    return { result: true };
  }

  @EventPattern(AUTH_VALIDATE_AT)
  async validateAt(@Payload() tokens: Tokens) {
    await this.authenticationJwtService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );
    return { accessDenied: true };
  }

  @EventPattern(AUTH_REFRESH_RT)
  async refreshRt(@Payload() tokens: Tokens): Promise<Tokens> {
    return await this.authService.refreshRt(tokens.refresh_token);
  }

  @EventPattern(AUTH_REFRESH_AT)
  async refreshAt(@Payload() tokens: Tokens): Promise<Tokens> {
    return await this.authService.refreshAt(tokens.refresh_token);
  }

  @EventPattern(AUTH_DECODE_AT)
  async decodeAt(@Payload('at') token: string): Promise<TokenPayload> {
    return await this.authenticationJwtService.verifyToken(
      token,
      TokenTypeEnum.ACCESS_TOKEN
    );
  }
}
