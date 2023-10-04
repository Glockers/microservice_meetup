import { Point } from 'geojson';
import { Tag } from './tag-meetup.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  location: Point;
}
