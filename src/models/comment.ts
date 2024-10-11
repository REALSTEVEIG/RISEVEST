import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from './post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @ManyToOne(() => Post, post => post.comments)
  post!: Post;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
