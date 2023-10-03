import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      apiKey: configService.get('FIREBASE_API_KEY'),
      authDomain: configService.get('FIREBASE_AUTH_DOMAIN'),
      projectId: configService.get('FIREBASE_PROJECT_ID'),
      storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: configService.get('FIREBASE_MESSAGING_SENDER_ID'),
      appId: configService.get('FIREBASE_APP_ID'),
      measurementId: configService.get('FIREBASE_MEASUREMENT_ID')
    };

    return initializeApp(firebaseConfig);
  }
};
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [firebaseProvider, FirebaseService],
  controllers: [FirebaseController],
  exports: [FirebaseService]
})
export class FirabaseModule {}
