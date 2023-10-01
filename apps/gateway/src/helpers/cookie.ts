import { Injectable, Res } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

@Injectable()
export class CookieHelper {
  setCookie(
    @Res() response: Response,
    key: string,
    value: unknown,
    options?: CookieOptions
  ) {
    response.cookie(key, value, options);
  }

  clearCookie(@Res({ passthrough: true }) response: Response, key: string) {
    response.clearCookie(key);
  }
}
