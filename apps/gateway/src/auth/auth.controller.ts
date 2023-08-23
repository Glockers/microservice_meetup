import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  loginUser(): string {
    return this.authService.login();
  }

  @Post('/reg')
  registerUser(): string {
    return this.authService.register();
  }
}
