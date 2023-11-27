import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Meetup } from './meetup.entity';

@Entity('meetup_registration')
export class MeetupRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @ManyToOne(() => Meetup, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meetup_id' })
  meetup: Meetup;

  @CreateDateColumn({ name: 'registration_data' })
  registrationDate!: Date;
}
