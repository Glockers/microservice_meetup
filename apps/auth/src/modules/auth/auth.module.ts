import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { mergedConfigValidationSchema } from '../../schemas/main';
import { JwtModule } from '@nestjs/jwt';
import { FirabaseModule } from '../firebase/firebase.module';
import { AuthService } from './auth.service';
import { AuthenticationJwtService } from './authentication-jwt.service';
import { AuthDatabaseModule } from '../../db/db.module';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/auth/.env'
    }),
    FirabaseModule,
    AuthDatabaseModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthenticationJwtService]
})
export class AuthModule {}
