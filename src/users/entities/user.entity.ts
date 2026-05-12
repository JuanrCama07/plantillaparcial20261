import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  bio: string;

  @Column({ type: 'int', default: 0 })
  followers: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, unique: true })
  apiKey: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];
}
