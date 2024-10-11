import { AppDataSource } from '../config/database';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

interface CreateUserDto {
    id: number;
    name: string;
    email: string;
}  

export const userService = {

  async createUser(data: CreateUserDto) {
        const userRepo = AppDataSource.getRepository(User);
        const newUser = userRepo.create(data);
        await userRepo.save(newUser);
      
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET as string, {
          expiresIn: '30d',
        });
      
        return { user: newUser, token };
    },
      
  async getUsers() {
    const userRepo = AppDataSource.getRepository(User);
    return await userRepo.find();
  },

  async getTopUsersWithLatestComments() {
    const query = `
      SELECT u.id, u.name, p.title, c.content
      FROM "user" u
      JOIN "post" p ON u.id = p."userId"
      LEFT JOIN "comment" c ON p.id = c."postId"
      WHERE c."createdAt" = (
        SELECT MAX(c2."createdAt")
        FROM "comment" c2
        WHERE c2."postId" = p.id
      )
      GROUP BY u.id, p.id, c.id
      ORDER BY COUNT(p.id) DESC
      LIMIT 3;
    `;
    const result = await AppDataSource.query(query);
    return result;
  }
};
