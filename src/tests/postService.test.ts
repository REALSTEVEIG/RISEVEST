import { postService } from '../services/postService';
import { AppDataSource } from '../config/database';
import { Post } from '../models/post';
import { User } from '../models/user';

jest.mock('../config/database');

describe('postService', () => {
  const postRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };
  const userRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(AppDataSource, 'getRepository').mockImplementation((model) => {
      if (model === Post) {
        return postRepo as any;
      }
      if (model === User) {
        return userRepo as any;
      }
      return {} as any;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a post for a user', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    const mockPost = { title: 'Post 1', content: 'Content 1', user: mockUser };

    userRepo.findOneBy.mockResolvedValue(mockUser);
    postRepo.create.mockReturnValue(mockPost);
    postRepo.save.mockResolvedValue(mockPost);

    const result = await postService.createPost('1', { title: 'Post 1', content: 'Content 1' });

    expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(postRepo.create).toHaveBeenCalledWith({ title: 'Post 1', content: 'Content 1', user: mockUser });
    expect(postRepo.save).toHaveBeenCalledWith(mockPost);
    expect(result).toEqual(mockPost);
  });

  it('should throw an error if user is not found', async () => {
    userRepo.findOneBy.mockResolvedValue(null);

    await expect(postService.createPost('1', { title: 'Post 1' })).rejects.toThrow('User not found');
  });

  it('should get posts by user', async () => {
    const mockPosts = [{ id: 1, title: 'Post 1', user: { id: 1 } }];
    postRepo.find.mockResolvedValue(mockPosts);

    const result = await postService.getPostsByUser('1');

    expect(postRepo.find).toHaveBeenCalledWith({ where: { user: { id: 1 } } });
    expect(result).toEqual(mockPosts);
  });
});
