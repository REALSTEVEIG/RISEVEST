import { userService } from '../services/userService';
import { AppDataSource } from '../config/database';
import jwt from 'jsonwebtoken';

jest.mock('../config/database');
jest.mock('jsonwebtoken');

describe('userService', () => {
  const userRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(AppDataSource, 'getRepository').mockReturnValue(userRepo as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return a token', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    userRepo.create.mockReturnValue(mockUser);
    userRepo.save.mockResolvedValue(mockUser);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    const result = await userService.createUser(mockUser);

    expect(userRepo.create).toHaveBeenCalledWith(mockUser);
    expect(userRepo.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({ user: mockUser, token: 'mockToken' });
  });

  it('should return all users', async () => {
    const users = [{ id: 1, name: 'Test User' }];
    userRepo.find.mockResolvedValue(users);

    const result = await userService.getUsers();

    expect(userRepo.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should get top users with their latest comments', async () => {
    const mockQueryResult = [{ id: 1, name: 'User 1', title: 'Post 1', content: 'Comment 1' }];
    (AppDataSource.query as jest.Mock).mockResolvedValue(mockQueryResult);

    const result = await userService.getTopUsersWithLatestComments();

    expect(AppDataSource.query).toHaveBeenCalled();
    expect(result).toEqual(mockQueryResult);
  });
});
