import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
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
import { Response, Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { JWT_COOKIE } from '../constants/jwt';
import { Tokens } from './interfaces';
import { ExctractJwtCookie } from '../decorators';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new JoiValidationPipe(authRequestSchema))
  async loginUser(@Body() authRequest: AuthRequest, @Res() response: Response) {
    const tokens = await this.authService.login(authRequest);

    response
      .cookie(JWT_COOKIE, tokens, { httpOnly: true })
      .sendStatus(HttpStatus.NO_CONTENT);
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

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req.cookies);
    res.clearCookie(JWT_COOKIE);

    res.send({
      message: 'user is logout'
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Res() response: Response,
    @ExctractJwtCookie() tokens: Tokens | null
  ) {
    if (!tokens)
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Refresh token is missing or invalid' });

    const newTokens = await this.authService.refresh(tokens);
    response
      .cookie(JWT_COOKIE, newTokens, { httpOnly: true })
      .sendStatus(HttpStatus.NO_CONTENT);
  }
}
