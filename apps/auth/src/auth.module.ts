import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { mergedConfigValidationSchema } from './schemas/main';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationJwtService } from './services/authentication-jwt.service';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/auth/.env'
    }),
    DatabaseModule.addEntities([User]),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthenticationJwtService]
})
export class AuthModule {}
