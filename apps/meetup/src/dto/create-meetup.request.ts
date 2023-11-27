export class CreateMeetupRequest {
  title: string;

  description: string;

  dateStart: Date;

  dateEnd: Date;

  lat: number;

  long: number;

  tags: string[];
}
