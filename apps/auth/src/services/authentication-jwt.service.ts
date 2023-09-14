import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenTypeEnum, Tokens } from '../types';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../types/payload.type';
import { AT_EXPIRES, RT_EXPIRES } from '../constants';

@Injectable()
export class AuthenticationJwtService {
  private readonly AT_SECRET: string;
  private readonly RT_SECRET: string;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.AT_SECRET = this.configService.get<string>('SECRET_JWT_ACCESS');
    this.RT_SECRET = this.configService.get<string>('SECRET_JWT_REFRESH');
  }

  async verifyToken(
    token: string,
    typeToken: TokenTypeEnum
  ): Promise<TokenPayload> {
    const secret =
      TokenTypeEnum.ACCESS_TOKEN === typeToken
        ? this.AT_SECRET
        : this.RT_SECRET;
    const { id } = await this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: secret
    });

    const selectedUser = this.userRepository.findOneBy({
      id
    });

    if (!selectedUser) throw new RpcException(new UnauthorizedException());

    return { id };
  }

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  async updateRtHash(userID: number, rt: string) {
    const selecteduser = await this.userRepository.findOneBy({
      id: userID
    });
    selecteduser.hashedRt = rt;
    await this.userRepository.save(selecteduser);
  }

  async checkIfRtIsWhiteListed(rt: string): Promise<boolean> {
    const rtRecord = await this.userRepository.findOneBy({
      hashedRt: rt
    });

    if (!rtRecord) false;
    return true;
  }
  async getTokens(id: number): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id
        },
        {
          secret: this.AT_SECRET,
          expiresIn: AT_EXPIRES
        }
      ),
      this.jwtService.signAsync(
        {
          id
        },
        {
          secret: this.RT_SECRET,
          expiresIn: RT_EXPIRES
        }
      )
    ]);
    return {
      access_token: at,
      refresh_token: rt
    };
  }
}
