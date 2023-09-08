import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { Tokens } from '../auth/interfaces';
import { JWT_COOKIE } from '../constants/jwt';

export const ExctractJwtCookie = createParamDecorator(
  (_: undefined, context: ExecutionContext): Tokens | null => {
    const request = context.switchToHttp().getRequest<Request>();
    const tokens = request?.cookies[JWT_COOKIE] as Tokens;

    if (!tokens || Object.keys(tokens).length === 0) return null;
    return tokens;
  }
);
