"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postService_1 = require("../services/postService");
const database_1 = require("../config/database");
const post_1 = require("../models/post");
jest.mock('../config/database');
describe('postService', () => {
    const postRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn() };
    const userRepo = { findOneBy: jest.fn() };
    beforeEach(() => {
        database_1.AppDataSource.getRepository
            .mockImplementation((model) => (model === post_1.Post ? postRepo : userRepo));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a post for a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, name: 'Test User' };
        const mockPost = { title: 'Post 1', content: 'Content 1', user: mockUser };
        userRepo.findOneBy.mockResolvedValue(mockUser);
        postRepo.create.mockReturnValue(mockPost);
        postRepo.save.mockResolvedValue(mockPost);
        const result = yield postService_1.postService.createPost('1', { title: 'Post 1', content: 'Content 1' });
        expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
        expect(postRepo.create).toHaveBeenCalledWith({ title: 'Post 1', content: 'Content 1', user: mockUser });
        expect(postRepo.save).toHaveBeenCalledWith(mockPost);
        expect(result).toEqual(mockPost);
    }));
    it('should throw an error if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        userRepo.findOneBy.mockResolvedValue(null);
        yield expect(postService_1.postService.createPost('1', { title: 'Post 1' })).rejects.toThrow('User not found');
    }));
    it('should get posts by user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPosts = [{ id: 1, title: 'Post 1', user: { id: 1 } }];
        postRepo.find.mockResolvedValue(mockPosts);
        const result = yield postService_1.postService.getPostsByUser('1');
        expect(postRepo.find).toHaveBeenCalledWith({ where: { user: { id: 1 } } });
        expect(result).toEqual(mockPosts);
    }));
});
