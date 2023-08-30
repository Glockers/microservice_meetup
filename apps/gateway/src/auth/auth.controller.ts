import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationRequest } from './dto/reg-request';
import { JoiValidationPipe } from '@app/common';
import { registrationRequestSchema } from './schemas/reg-schema';
import { authRequestSchema } from './schemas/auth-schema';
import { AuthRequest } from './dto/auth-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new JoiValidationPipe(authRequestSchema))
  async loginUser(@Body() authRequest: AuthRequest) {
    await this.authService.login(authRequest);
  }

  @Post('/reg')
  @UsePipes(new JoiValidationPipe(registrationRequestSchema))
  async registerUser(
    @Body() registrationRequest: RegistrationRequest
  ): Promise<void> {
    try {
      await this.authService.reg(registrationRequest);
    } catch (err) {
      return err;
    }
  }
}
