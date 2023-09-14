import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: true })
  public hashedRt!: string;
}
