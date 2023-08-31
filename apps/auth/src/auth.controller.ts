import { Controller, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService, RpcFilter } from '@app/common';
import { RegistrationRequest } from './dto/reg.request';
import { AuthRequest } from './dto/auth.request';
import { AUTH_LOGIN, AUTH_REG } from './constants';

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
  ) {
    await this.authService.login(data);
    this.rmqService.ack(context);
    const jwtToken = 'mock';
    return { jwtToken };
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
}
