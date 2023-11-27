import { Meetup } from '../models';

export interface MeetupSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: Meetup;
    }>;
  };
}
