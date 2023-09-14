import { AuthGuard } from './../../../guards/auth.guard';
import { HttpExceptionFilter } from './../../../filters/controller.filter';
import { NAME_JWT_COOKIE } from './../../../constants/jwt';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { ExctractJwtFromCookie } from 'apps/gateway/src/decorators';
import { Tokens } from '../../auth/interfaces';
import { RegService } from './registration.service';
import { AuthService } from '../../auth/auth.service';

@Controller('meetup')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
export class RegController {
  constructor(
    private readonly regService: RegService,
    private readonly authService: AuthService
  ) {}

  @Post('/reg/:id')
  async regOnMeetup(
    @Param('id', ParseIntPipe) meetupID: number,
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    const tokenPayload = await this.authService.decodeAt(tokens.access_token);
    await this.regService.regOnMeetup(tokenPayload.id, meetupID);

    return {
      status: HttpStatus.OK,
      message: 'user subscribed to meetup'
    };
  }

  @Get('/my-reg')
  async getMyRegistrations(
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    const tokenPayload = await this.authService.decodeAt(tokens.access_token);

    return await this.regService.getMyMeetups(tokenPayload.id);
  }
}
