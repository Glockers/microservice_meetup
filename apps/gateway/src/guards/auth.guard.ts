import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH') private readonly authService: ClientProxy) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') {
      return false;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const cookie = request?.cookies;

    if (!cookie || Object.keys(cookie).length === 0) return false;
    return this.authService.send('auth/validate_access_token', cookie).pipe(
      tap((res) => {
        return of(res.accessDenied);
      }),
      catchError(() => {
        throw new UnauthorizedException();
      })
    );
  }
}
