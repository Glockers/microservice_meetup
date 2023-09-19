export interface MeetupSearchBody {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export interface MeetupSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: MeetupSearchBody;
    }>;
  };
}
