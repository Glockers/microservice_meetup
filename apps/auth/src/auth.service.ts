import {
  ConflictException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRequest } from './dto/auth.request';
import { RegistrationRequest } from './dto/reg.request';
import { RpcException } from '@nestjs/microservices';
import { USER_ALREADY_REG, ACCESS_DENIED } from './constants';
import { User } from './models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
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

    const tokens = await this.getTokens(selectedUser.id, selectedUser.login);
    await this.updateRtHash(selectedUser.id, tokens.refresh_token);
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

    const tokens = await this.getTokens(newUser.id, newUser.login);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async findUserByLogin(login: string): Promise<User> {
    return await this.userRepository.findOneBy({
      login
    });
  }

  async updateRtHash(userID: number, rt: string) {
    const hash = await this.hashData(rt);
    const selecteduser = await this.userRepository.findOneBy({
      id: userID
    });
    selecteduser.hashedRt = hash;
    await this.userRepository.save(selecteduser);
  }

  async getTokens(id: number, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          login
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15
        }
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          login
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7
        }
      )
    ]);
    return {
      access_token: at,
      refresh_token: rt
    };
  }
}
