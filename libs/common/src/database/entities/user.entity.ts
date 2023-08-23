import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Meetup } from './meetup.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public login!: string;

  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar' })
  public avatar!: string;

  @OneToMany(() => Meetup, (meetup) => meetup.organizer, {
    onDelete: 'CASCADE'
  })
  organizedMeetups: Meetup[];
}
