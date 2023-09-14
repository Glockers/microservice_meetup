import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { Tokens } from '../types';

export const ExctractJwtFromCookie = createParamDecorator(
  (data: string, context: ExecutionContext): Tokens | null => {
    const request = context.switchToHttp().getRequest<Request>();
    const tokens = request?.cookies[data] as Tokens;
    if (!tokens || Object.keys(tokens).length === 0) return null;
    return tokens;
  }
);
