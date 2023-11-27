export class CreateMeetupRequest {
  title: string;

  description: string;

  dateStart: Date;

  dateEnd: Date;

  latitude: number;

  longitude: number;

  tags: string[];
}
