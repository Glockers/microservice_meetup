import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common';
import { Tokens } from '../types';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { NAME_JWT_COOKIE } from '../constants/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const tokens = request?.cookies[NAME_JWT_COOKIE] as Tokens;
    if (!tokens || Object.keys(tokens).length === 0) return false;
    return await this.authService.validateAt(tokens);
  }
}
