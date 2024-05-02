import { AuthGuard } from './../../../guards/auth.guard';
import { NAME_JWT_COOKIE } from './../../../constants';
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
import { RegistrationService } from './registration.service';
import { AuthService } from '../../auth/auth.service';
import { HttpExceptionFilter } from 'apps/gateway/src/filters';

@Controller('meetup/registration')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly authService: AuthService
  ) {}

  @Post('/:id')
  async registerOnMeetup(
    @Param('id', ParseIntPipe) meetupID: number,
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    const { id: userID } = await this.authService.decodeAt(tokens.access_token);
    await this.registrationService.registerOnMeetup(userID, meetupID);

    return {
      status: HttpStatus.OK,
      message: 'user subscribed to meetup'
    };
  }

  @Get('/my')
  async getMyRegistrations(
    @ExctractJwtFromCookie(NAME_JWT_COOKIE) tokens: Tokens | null
  ) {
    const tokenPayload = await this.authService.decodeAt(tokens.access_token);
    return await this.registrationService.getMyMeetups(tokenPayload.id);
  }
}
