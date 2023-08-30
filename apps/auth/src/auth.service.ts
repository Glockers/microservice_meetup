import { User } from '@app/common';
import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRequest } from './dto/auth-request';
import { RegistrationRequest } from './dto/reg-request';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login(authRequest: AuthRequest) {
    const selectedUser = await this.findUserByLogin(authRequest.login);
    if (!selectedUser)
      throw new RpcException(new NotFoundException('this user not found'));
    return authRequest.login === selectedUser.login &&
      authRequest.password === selectedUser.password
      ? 'jwt'
      : false;
  }

  async reg(registrationRequest: RegistrationRequest) {
    const selectedUser = await this.findUserByLogin(registrationRequest.login);
    if (selectedUser)
      throw new RpcException(new ConflictException('this user alreay reg'));
    this.userRepository.save(registrationRequest);
  }

  async findUserByLogin(login: string) {
    return await this.userRepository.findOneBy({
      login
    });
  }
}
