import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('auth') private authClient: ClientProxy) {}

  login(): string {
    return 'login';
  }
  register(): string {
    return 'register';
  }
}
