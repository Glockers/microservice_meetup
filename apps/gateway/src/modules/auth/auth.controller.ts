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
import { RegistrationRequest } from './dto/reg-request';
import { registrationRequestSchema } from './schemas/reg.schema';
import { authRequestSchema } from './schemas/auth.schema';
import { AuthRequest } from './dto/auth-request';
import { UseFilters } from '@nestjs/common';
import { Response, Express } from 'express';
import { Tokens } from './interfaces';
import { HttpExceptionFilter } from '../../filters/controller.filter';
import { JoiValidationPipe } from '../../helpers';
import { NAME_JWT_COOKIE } from '../../constants';
import { AuthGuard } from '../../guards';
import { ExctractJwtFromCookie } from '../../decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ALLOWED_FILES, MAX_SIZE_IMAGE } from '../../constants/file';

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

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
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
