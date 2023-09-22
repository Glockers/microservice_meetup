import { Inject, Injectable } from '@nestjs/common';
import { FirebaseApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { FirabaseBuffer } from '../../types/buffer.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models';
import { Repository } from 'typeorm';

@Injectable()
export class FirebaseService {
  private storage;
  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: FirebaseApp,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    this.storage = getStorage(firebaseApp);
  }

  async uploadAvatar(
    userID: number,
    file: Express.Multer.File
  ): Promise<boolean> {
    const storageRef = ref(this.storage, file.originalname);
    const bytes = new Uint8Array((file.buffer as FirabaseBuffer).data);
    const uploadedFile = await uploadBytes(storageRef, bytes);

    const user = await this.userRepository.findOneBy({
      id: userID
    });

    user.avatar = await getDownloadURL(uploadedFile.ref);
    this.userRepository.save(user);
    return true;
  }
}
