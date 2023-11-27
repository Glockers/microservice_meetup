import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RpcFilter } from '@app/common';
import { USER_LOAD_FILE } from '../../constants';
import { Express } from 'express';
import { UserService } from './user.service';

@Controller()
@UseFilters(new RpcFilter())
export class UserController {
  constructor(private firebaseService: UserService) {}

  @EventPattern(USER_LOAD_FILE)
  async uploadAvatar(
    @Payload('file') file: Express.Multer.File,
    @Payload('userID') userID: number
  ) {
    this.firebaseService.uploadAvatar(userID, file);
    return true;
  }
}
