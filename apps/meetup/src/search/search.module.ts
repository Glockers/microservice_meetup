import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [ElasticsearchModule, SearchService]
})
export class SearchModule {}
