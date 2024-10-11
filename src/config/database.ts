import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT as string, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'backend_test',
  entities: [User, Post, Comment],
  synchronize: true,
  migrations: ['./src/migrations/*.ts'], 
});
