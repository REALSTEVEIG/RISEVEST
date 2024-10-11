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
const commentService_1 = require("../services/commentService");
const database_1 = require("../config/database");
const comment_1 = require("../models/comment");
jest.mock('../config/database');
describe('commentService', () => {
    const commentRepo = { create: jest.fn(), save: jest.fn() };
    const postRepo = { findOneBy: jest.fn() };
    beforeEach(() => {
        database_1.AppDataSource.getRepository.mockImplementation((model) => {
            return model === comment_1.Comment ? commentRepo : postRepo;
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should add a comment to a post', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPost = { id: 1, title: 'Post 1' };
        const mockComment = { content: 'Nice post', post: mockPost };
        postRepo.findOneBy.mockResolvedValue(mockPost);
        commentRepo.create.mockReturnValue(mockComment);
        commentRepo.save.mockResolvedValue(mockComment);
        const result = yield commentService_1.commentService.addComment('1', { content: 'Nice post' });
        expect(postRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
        expect(commentRepo.create).toHaveBeenCalledWith({ content: 'Nice post', post: mockPost });
        expect(commentRepo.save).toHaveBeenCalledWith(mockComment);
        expect(result).toEqual(mockComment);
    }));
    it('should throw an error if post is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        postRepo.findOneBy.mockResolvedValue(null);
        yield expect(commentService_1.commentService.addComment('1', { content: 'Nice post' })).rejects.toThrow('Post not found');
    }));
});
