import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Exclude()
  @Column({ name: 'userId' })
  userId!: string;

  @CreateDateColumn()
  createdAt: Date;
}
