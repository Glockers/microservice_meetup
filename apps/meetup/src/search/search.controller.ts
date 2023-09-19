import { RpcFilter } from '@app/common';
import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SMART_SEARCH_MEETUP } from '../constants/meetup-endpoints';
import { SearchService } from './search.service';

@Controller()
@UseFilters(new RpcFilter())
export class SearchController {
  constructor(private searchService: SearchService) {}

  @EventPattern(SMART_SEARCH_MEETUP)
  async fetchESMeetups(@Payload('text') text: string) {
    return await this.searchService.search(text);
  }
}
