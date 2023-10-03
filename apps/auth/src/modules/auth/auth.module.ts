import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { FirabaseModule } from '../firebase/firebase.module';
import { AuthService } from './auth.service';
import { AuthenticationJwtService } from './authentication-jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models';

@Module({
  imports: [
    FirabaseModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthenticationJwtService]
})
export class AuthModule {}
