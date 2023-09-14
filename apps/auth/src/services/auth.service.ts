import {
  ConflictException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { AuthRequest } from '../dto/auth.request';
import { RegistrationRequest } from '../dto/reg.request';
import { RpcException } from '@nestjs/microservices';
import { USER_ALREADY_REG, ACCESS_DENIED } from '../constants';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { TokenTypeEnum, Tokens } from '../types';
import { AuthenticationJwtService } from './authentication-jwt.service';
import { TokenPayload } from '../types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authenticationJwtService: AuthenticationJwtService
  ) {}

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  async login(authRequest: AuthRequest): Promise<Tokens> {
    const selectedUser = await this.findUserByLogin(authRequest.login);
    if (!selectedUser)
      throw new RpcException(new ForbiddenException(ACCESS_DENIED));

    const passwordMatched = await bcrypt.compare(
      authRequest.password,
      selectedUser.password
    );

    if (!passwordMatched)
      throw new RpcException(new ForbiddenException(ACCESS_DENIED));

    const tokens = await this.authenticationJwtService.getTokens(
      selectedUser.id
    );

    await this.authenticationJwtService.updateRtHash(
      selectedUser.id,
      tokens.refresh_token
    );
    return tokens;
  }

  async reg(registrationRequest: RegistrationRequest): Promise<Tokens> {
    const selectedUser = await this.findUserByLogin(registrationRequest.login);
    if (selectedUser)
      throw new RpcException(new ConflictException(USER_ALREADY_REG));

    const hash = await this.hashData(registrationRequest.password);
    const newUser = await this.userRepository.save({
      avatar: registrationRequest.avatar,
      login: registrationRequest.login,
      password: hash
    });

    const tokens = await this.authenticationJwtService.getTokens(newUser.id);
    await this.authenticationJwtService.updateRtHash(
      newUser.id,
      tokens.refresh_token
    );
    return tokens;
  }

  async findUserByLogin(login: string): Promise<User> {
    return await this.userRepository.findOneBy({
      login
    });
  }

  async verifyRt(rt: string): Promise<TokenPayload> {
    const isExistRt =
      await this.authenticationJwtService.checkIfRtIsWhiteListed(rt);
    if (!isExistRt)
      throw new RpcException(new ConflictException('Неверный rt'));

    return await this.authenticationJwtService.verifyToken(
      rt,
      TokenTypeEnum.REFRESH_TOKEN
    );
  }

  async refreshRt(rt: string): Promise<Tokens> {
    const { id } = await this.verifyRt(rt);

    const newTokens = await this.authenticationJwtService.getTokens(id);
    await this.authenticationJwtService.updateRtHash(
      id,
      newTokens.refresh_token
    );
    return newTokens;
  }

  async refreshAt(rt: string): Promise<Tokens> {
    const { id } = await this.verifyRt(rt);

    const newTokens = await this.authenticationJwtService.getTokens(id);

    return {
      access_token: newTokens.access_token,
      refresh_token: rt
    };
  }

  async logout(tokens: Tokens) {
    const { id } = await this.authenticationJwtService.verifyToken(
      tokens.access_token,
      TokenTypeEnum.ACCESS_TOKEN
    );

    return await this.userRepository.update(
      {
        id,
        hashedRt: Not(IsNull())
      },
      {
        hashedRt: null
      }
    );
  }
}
