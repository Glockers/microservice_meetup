import { UseFilters } from '@nestjs/common';
import { Response, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationRequest, AuthRequest } from './dto';
import { authRequestSchema, registrationRequestSchema } from './schemas';
import { Tokens } from './interfaces';
import { HttpExceptionFilter } from '../../filters';
import { CookieHelper, JoiValidationPipe } from '../../helpers';
import { AuthGuard } from '../../guards';
import { ExctractJwtFromCookie } from '../../decorators';
import {
  ALLOWED_FILES,
  MAX_SIZE_IMAGE,
  NAME_JWT_COOKIE
} from '../../constants';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieHelper: CookieHelper
  ) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(authRequestSchema))
  async loginUser(@Body() authRequest: AuthRequest, @Res() response: Response) {
    const tokens = await this.authService.login(authRequest);
    this.cookieHelper.setCookie(response, NAME_JWT_COOKIE, tokens, {
      httpOnly: true
    });

    response.sendStatus(HttpStatus.OK);
  }

  @Post('registration')
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
    @Res() response: Response,
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    await this.authService.logout(tokens);
    this.cookieHelper.clearCookie(response, NAME_JWT_COOKIE);
    response.send({
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
    this.cookieHelper.setCookie(response, NAME_JWT_COOKIE, newTokens, {
      httpOnly: true
    });
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
    this.cookieHelper.setCookie(response, NAME_JWT_COOKIE, newTokens, {
      httpOnly: true
    });
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  public async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: ALLOWED_FILES }),
          new MaxFileSizeValidator({ maxSize: MAX_SIZE_IMAGE })
        ]
      })
    )
    file: Express.Multer.File,
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    const { id: userID } = await this.authService.decodeAt(tokens.access_token);
    await this.authService.loadAvatar(userID, file);
  }
}
