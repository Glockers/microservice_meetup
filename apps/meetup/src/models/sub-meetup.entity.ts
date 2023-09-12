import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('meetup_registration')
export class MeetupRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column()
  title: string;

  @CreateDateColumn({ name: 'registration_data' })
  registrationDate!: Date;
}
