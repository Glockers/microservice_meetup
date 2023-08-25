import { CreateMeetupRequest } from './create-meetup.request';

export class UpdateMeetupRequest extends CreateMeetupRequest {
  id: number;
}
