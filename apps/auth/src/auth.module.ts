import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule, RmqModule, User } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { mergedConfigValidationSchema } from './config/main.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/auth/.env'
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
