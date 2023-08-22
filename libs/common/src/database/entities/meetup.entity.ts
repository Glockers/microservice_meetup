import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity('meetups')
export class Meetup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  dateStart: Date;

  @Column({ type: 'timestamp' })
  dateEnd: Date;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @ManyToOne(() => User, (user) => user.organizedMeetups)
  @JoinTable({ name: 'organizer' })
  organizer: User;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable({ name: 'participants' })
  participants: User[];
}
