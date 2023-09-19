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
        latitude: meetup.latitude,
        longitude: meetup.longitude,
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

  async search(text: string) {
    const result = await this.elasticsearchService.search<MeetupSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'description']
          }
        }
      }
    });
    const hits = result.hits.hits;
    return hits.map((item) => item._source);
  }
}
