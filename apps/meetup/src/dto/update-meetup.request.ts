import { CreateMeetupRequest } from './create-meetup.request';

export class UpdateMeetupRequest {
  id: number;
  createMeetupRequest: CreateMeetupRequest;
}
