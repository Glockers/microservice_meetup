import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationRequest, AuthRequest } from './dto';
import { Tokens } from './interfaces';
import {
  AUTH_DECODE_AT,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_AT,
  AUTH_REFRESH_RT,
  AUTH_REG,
  AUTH_VALIDATE_AT,
  USER_LOAD_FILE
} from '../../constants';
import { TokenPayload } from '../../types';
import { AuthCommunication } from './helpers/auth-communication';

@Injectable()
export class AuthService {
  constructor(private readonly authCommunication: AuthCommunication) {}

  async login(authRequest: AuthRequest): Promise<Tokens> {
    return await this.authCommunication.sendToMicroservice(AUTH_LOGIN, {
      authRequest
    });
  }

  async reg(registrationRequest: RegistrationRequest) {
    return await this.authCommunication.sendToMicroservice(AUTH_REG, {
      registrationRequest
    });
  }

  async logout(tokens: Tokens) {
    return await this.authCommunication.sendToMicroservice(AUTH_LOGOUT, tokens);
  }

  async validateAt(tokens: Tokens): Promise<boolean> {
    try {
      return await this.authCommunication.sendToMicroservice<boolean>(
        AUTH_VALIDATE_AT,
        tokens
      );
    } catch {
      throw new UnauthorizedException();
    }
  }

  async refreshRt(tokens: Tokens): Promise<Tokens> {
    return await this.authCommunication.sendToMicroservice<Tokens>(
      AUTH_REFRESH_RT,
      tokens
    );
  }

  async refreshAt(tokens: Tokens): Promise<Tokens> {
    try {
      return await this.authCommunication.sendToMicroservice<Tokens>(
        AUTH_REFRESH_AT,
        tokens
      );
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async decodeAt(at: string): Promise<TokenPayload> {
    return await this.authCommunication.sendToMicroservice<TokenPayload>(
      AUTH_DECODE_AT,
      { at }
    );
  }

  async loadAvatar(userID: number, file: Express.Multer.File) {
    return await this.authCommunication.sendToMicroservice<boolean>(
      USER_LOAD_FILE,
      { userID, file }
    );
  }
}
