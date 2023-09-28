import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MeetupSearchResult } from '../types/postSearchBody.interface';
import { Meetup } from '../models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  index: string;

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    confgiService: ConfigService
  ) {
    this.index = confgiService.get<string>('ES_MEETUP_INDEX');
  }

  async indexMeetup(meetup: Meetup) {
    return this.elasticsearchService.index({
      index: this.index,
      body: {
        id: meetup.id,
        title: meetup.title,
        description: meetup.description,
        dateStart: meetup.dateStart,
        dateEnd: meetup.dateEnd,
        location: meetup.location,
        tags: meetup.tags
      }
    });
  }

  async delete(meetupID: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: meetupID
          }
        }
      }
    });
  }

  async update(meetup: Meetup) {
    await this.delete(meetup.id);
    await this.indexMeetup(meetup);
  }

  async searchRecords<T>(query: unknown): Promise<T[]> {
    const result = await this.elasticsearchService.search<T>({
      index: this.index,
      body: query
    });

    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }

  async search(text: string) {
    const query = {
      query: {
        multi_match: {
          query: text,
          fields: ['title', 'description']
        }
      }
    };

    return this.searchRecords<MeetupSearchResult>(query);
  }

  async getAllRecords() {
    const query = {
      query: {
        match_all: {}
      }
    };

    return this.searchRecords<Meetup>(query);
  }
}
