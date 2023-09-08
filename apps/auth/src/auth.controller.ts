import { Controller, UseFilters } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RpcFilter } from '@app/common';
import { RegistrationRequest } from './dto/reg.request';
import { AuthRequest } from './dto/auth.request';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REFRESH, AUTH_REG } from './constants';
import { EToken, Tokens } from './types';
import { AuthenticationJwtService } from './services/authentication-jwt.service';

@Controller()
@UseFilters(new RpcFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private authenticationJwtService: AuthenticationJwtService
  ) {}

  @EventPattern(AUTH_LOGIN)
  async login(@Payload('authRequest') data: AuthRequest): Promise<Tokens> {
    const tokens = await this.authService.login(data);
    return tokens;
  }

  @EventPattern(AUTH_REG)
  async reg(@Payload('registrationRequest') data: RegistrationRequest) {
    await this.authService.reg(data);
    return { success: true };
  }

  @EventPattern(AUTH_REFRESH)
  async refresh(@Payload('jwt_token') tokens: Tokens): Promise<Tokens> {
    return await this.authService.refresh(tokens.refresh_token);
  }

  @EventPattern(AUTH_LOGOUT)
  async logout(@Payload('jwt_token') tokens: Tokens) {
    await this.authService.logout(tokens);
  }

  @UseFilters(new RpcFilter())
  @EventPattern('auth/validate_access_token')
  async validate_token(@Payload('jwt_token') tokens: Tokens) {
    await this.authenticationJwtService.validateToken(
      tokens.access_token,
      EToken.ACCESS_TOKEN
    );

    return { accessDenied: true };
  }
}
