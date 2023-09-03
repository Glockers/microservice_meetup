import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({})
export class DatabaseModule {
  static addEntities(entities: any[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('TYPEORM_HOST'),
            port: +configService.get('TYPEORM_PORT'),
            username: configService.get('TYPEORM_USERNAME'),
            password: configService.get('TYPEORM_PASSWORD'),
            database: configService.get('TYPEORM_DATABASE'),
            entities: entities,
            synchronize: true
          }),
          inject: [ConfigService]
        })
      ]
    };
  }
}
