import { Controller, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService, RpcFilter } from '@app/common';
import { RegistrationRequest } from './dto/reg.request';
import { AuthRequest } from './dto/auth.request';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REFRESH, AUTH_REG } from './constants';
import { Tokens } from './types';

@Controller()
@UseFilters(new RpcFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RmqService
  ) {}

  @EventPattern(AUTH_LOGIN)
  async login(
    @Payload('authRequest') data: AuthRequest,
    @Ctx() context: RmqContext
  ): Promise<Tokens> {
    await this.authService.login(data);
    this.rmqService.ack(context);
    return { access_token: 'ha', refresh_token: 'he' };
  }

  @EventPattern(AUTH_REG)
  async reg(
    @Payload('registrationRequest') data: RegistrationRequest,
    @Ctx() context: RmqContext
  ) {
    await this.authService.reg(data);
    this.rmqService.ack(context);
    return { success: true };
  }

  @EventPattern(AUTH_REFRESH)
  async refresh() {
    // @Ctx() context: RmqContext // @Payload() data: RegistrationRequest,
    // await this.authService.reg(data);
    // this.rmqService.ack(context);
    // return { success: true };
  }

  @EventPattern(AUTH_LOGOUT)
  async logout() {
    // @Ctx() context: RmqContext // @Payload() data: RegistrationRequest,
    // await this.authService.reg(data);
    // this.rmqService.ack(context);
    // return { success: true };
  }
}
