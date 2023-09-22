import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { mergedConfigValidationSchema } from './schemas/main';
import { AuthModule } from './modules/auth/auth.module';
import { FirabaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: mergedConfigValidationSchema,
      envFilePath: './apps/auth/.env'
    }),
    AuthModule,
    FirabaseModule
  ]
})
export class AppModule {}
