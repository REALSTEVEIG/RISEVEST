import { AppDataSource } from '../config/database';
import { Post } from '../models/post';
import { User } from '../models/user';

export const postService = {
  async createPost(userId: string, data: any) {
    const postRepo = AppDataSource.getRepository(Post);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: Number(userId) });
    if (!user) throw new Error('User not found');

    const post = postRepo.create({ ...data, user });
    return await postRepo.save(post);
  },

  async getPostsByUser(userId: string) {
    const postRepo = AppDataSource.getRepository(Post);
    return await postRepo.find({ where: { user: { id: Number(userId) } } });
  }
};
