import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationRequest } from './dto/reg-request';
import { registrationRequestSchema } from './schemas/reg.schema';
import { authRequestSchema } from './schemas/auth.schema';
import { AuthRequest } from './dto/auth-request';
import { JoiValidationPipe } from '../helpers';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/controller.filter';
import { Response } from 'express';
import { NAME_JWT_COOKIE } from '../constants/jwt';
import { Tokens } from './interfaces';
import { ExctractJwtFromCookie } from '../decorators';
import { AuthGuard } from '../guards';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(authRequestSchema))
  async loginUser(@Body() authRequest: AuthRequest, @Res() response: Response) {
    const tokens = await this.authService.login(authRequest);

    response
      .cookie(NAME_JWT_COOKIE, tokens, { httpOnly: true })
      .sendStatus(HttpStatus.NO_CONTENT);
  }

  @Post('reg')
  @UsePipes(new JoiValidationPipe(registrationRequestSchema))
  async registerUser(@Body() registrationRequest: RegistrationRequest) {
    await this.authService.reg(registrationRequest);
    return {
      status: HttpStatus.CREATED,
      message: 'User was created'
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async logout(
    @Res() res: Response,
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    await this.authService.logout(tokens);
    res.clearCookie(NAME_JWT_COOKIE);

    res.send({
      message: 'user is logout'
    });
  }

  @Post('refresh-rt')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Res() response: Response,
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    if (!tokens || !tokens.refresh_token)
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Refresh token is missing or invalid' });
    const newTokens = await this.authService.refreshRt(tokens);
    response
      .cookie(NAME_JWT_COOKIE, newTokens, { httpOnly: true })
      .sendStatus(HttpStatus.NO_CONTENT);
  }

  @Post('refresh-at')
  public async refreshAt(
    @Res() response: Response,
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    if (!tokens || !tokens?.refresh_token)
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'rt is empty' });
    const newTokens = await this.authService.refreshAt(tokens);
    response
      .cookie(NAME_JWT_COOKIE, newTokens, { httpOnly: true })
      .sendStatus(HttpStatus.NO_CONTENT);
  }
}
