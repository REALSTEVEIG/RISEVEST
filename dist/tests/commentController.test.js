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
const commentController_1 = require("../controllers/commentController");
const commentService_1 = require("../services/commentService");
jest.mock('../src/services/commentService');
describe('Comment Controller', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = { params: { postId: '1' }, body: { content: 'Nice post!' } };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    it('should create a new comment', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockComment = { id: 1, content: 'Nice post!', postId: 1 };
        commentService_1.commentService.addComment.mockResolvedValue(mockComment);
        yield (0, commentController_1.addComment)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockComment);
    }));
});
