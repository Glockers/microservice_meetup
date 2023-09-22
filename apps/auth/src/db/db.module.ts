import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models';

@Module({
  imports: [
    DatabaseModule.addEntities([User]),
    TypeOrmModule.forFeature([User])
  ],
  exports: [DatabaseModule, TypeOrmModule]
})
export class AuthDatabaseModule {}
