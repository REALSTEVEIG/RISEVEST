import { AppDataSource } from '../config/database';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

export const commentService = {
  async addComment(postId: string, data: any) {
    const commentRepo = AppDataSource.getRepository(Comment);
    const postRepo = AppDataSource.getRepository(Post);

    const post = await postRepo.findOneBy({ id: Number(postId) });
    if (!post) throw new Error('Post not found');

    const comment = commentRepo.create({ ...data, post });
    return await commentRepo.save(comment);
  }
};
