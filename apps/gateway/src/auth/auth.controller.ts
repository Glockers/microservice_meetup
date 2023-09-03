import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationRequest } from './dto/reg-request';
import { registrationRequestSchema } from './schemas/reg.schema';
import { authRequestSchema } from './schemas/auth.schema';
import { AuthRequest } from './dto/auth-request';
import { JoiValidationPipe } from '../helpers';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/controller.filter';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new JoiValidationPipe(authRequestSchema))
  async loginUser(@Body() authRequest: AuthRequest) {
    await this.authService.login(authRequest);
  }

  @Post('/reg')
  @UsePipes(new JoiValidationPipe(registrationRequestSchema))
  async registerUser(@Body() registrationRequest: RegistrationRequest) {
    await this.authService.reg(registrationRequest);
    return {
      status: HttpStatus.CREATED,
      message: 'User was created'
    };
  }
}
