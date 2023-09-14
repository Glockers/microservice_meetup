import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Meetup } from './meetup.entity';

@Entity('tags')
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meetup, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meetup_id' })
  meetup: Meetup;

  @Column({ name: 'name' })
  name: string;
}
