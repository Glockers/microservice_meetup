import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { mergedConfigValidationSchema } from './schemas/main';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/auth/.env'
    }),
    DatabaseModule.addEntities([User]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
