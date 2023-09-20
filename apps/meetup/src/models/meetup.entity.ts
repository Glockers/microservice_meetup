import { Point } from 'geojson';
import { Tags } from './tag-meetup.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

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

  @OneToMany(() => Tags, (tags) => tags.meetup)
  @JoinTable()
  tags: Tags[];

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  location: Point;
}
