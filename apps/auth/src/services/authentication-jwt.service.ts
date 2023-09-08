import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EToken, Tokens } from '../types';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/payload.type';

@Injectable()
export class AuthenticationJwtService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateToken(token: string, typeToken: EToken) {
    const { login, id } = await this.decodeToken(token, typeToken);
    const selectedUser = this.userRepository.findOneBy({
      login
    });

    if (!selectedUser) throw new RpcException(new UnauthorizedException());

    return { login, id };
  }

  async decodeToken(token: string, typeToken: EToken): Promise<TokenPayload> {
    const secret =
      EToken.ACCESS_TOKEN === typeToken
        ? this.configService.get<string>('SECRET_JWT_ACCESS')
        : this.configService.get<string>('SECRET_JWT_REFRESH');
    return await this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: secret
    });
  }

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
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
    const AT_SECRET = this.configService.get<string>('SECRET_JWT_ACCESS');
    const RT_SECRET = this.configService.get<string>('SECRET_JWT_REFRESH');
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          login
        },
        {
          secret: AT_SECRET,
          expiresIn: 60 * 5
        }
      ),
      this.jwtService.signAsync(
        {
          id,
          login
        },
        {
          secret: RT_SECRET,
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
