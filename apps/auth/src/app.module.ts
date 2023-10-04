import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { mergedConfigValidationSchema } from './schemas/main';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqModule } from '@app/common';
import { AuthModule } from './modules/auth/auth.module';
import { dataSourceOptions } from '../db/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/auth/.env'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
    RmqModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
