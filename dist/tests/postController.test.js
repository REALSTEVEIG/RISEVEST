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
const postController_1 = require("../controllers/postController");
const postService_1 = require("../services/postService");
jest.mock('../src/services/postService');
describe('Post Controller', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = { params: { id: '1' }, body: { title: 'New Post' } };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    it('should create a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPost = { id: 1, title: 'New Post', userId: 1 };
        postService_1.postService.createPost.mockResolvedValue(mockPost);
        yield (0, postController_1.createPost)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockPost);
    }));
    it('should get posts by user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPosts = [{ id: 1, title: 'Post 1', userId: 1 }];
        postService_1.postService.getPostsByUser.mockResolvedValue(mockPosts);
        yield (0, postController_1.getPostsByUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockPosts);
    }));
});
