import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { RegistrationRequest } from './dto/reg-request';
import { AuthRequest } from './dto/auth-request';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RmqService
  ) {}

  @EventPattern('auth/login')
  async login(
    @Payload('authRequest') data: AuthRequest,
    @Ctx() context: RmqContext
  ) {
    await this.authService.login(data);
    this.rmqService.ack(context);
    const jwtToken = 'mock';
    return { jwtToken };
  }

  @EventPattern('auth/reg')
  async reg(
    @Payload('registrationRequest') data: RegistrationRequest,
    @Ctx() context: RmqContext
  ) {
    await this.authService.reg(data);
    this.rmqService.ack(context);
    return {};
  }
}
