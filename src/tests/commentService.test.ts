import { commentService } from '../services/commentService';
import { AppDataSource } from '../config/database';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

jest.mock('../config/database');

describe('commentService', () => {
  const commentRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };
  const postRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(AppDataSource, 'getRepository').mockImplementation((model) => {
      if (model === Comment) {
        return commentRepo as any;
      }
      if (model === Post) {
        return postRepo as any;
      }
      return {} as any;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a comment to a post', async () => {
    const mockPost = { id: 1, title: 'Post 1' };
    const mockComment = { content: 'Nice post', post: mockPost };

    postRepo.findOneBy.mockResolvedValue(mockPost);
    commentRepo.create.mockReturnValue(mockComment);
    commentRepo.save.mockResolvedValue(mockComment);

    const result = await commentService.addComment('1', { content: 'Nice post' });

    expect(postRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(commentRepo.create).toHaveBeenCalledWith({ content: 'Nice post', post: mockPost });
    expect(commentRepo.save).toHaveBeenCalledWith(mockComment);
    expect(result).toEqual(mockComment);
  });

  it('should throw an error if post is not found', async () => {
    postRepo.findOneBy.mockResolvedValue(null);

    await expect(commentService.addComment('1', { content: 'Nice post' })).rejects.toThrow('Post not found');
  });
});
