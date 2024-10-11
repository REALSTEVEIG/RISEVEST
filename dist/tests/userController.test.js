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
const userController_1 = require("../controllers/userController");
const userService_1 = require("../services/userService");
jest.mock('../src/services/userService');
describe('User Controller', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = { body: { name: 'John Doe' } };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, name: 'John Doe' };
        userService_1.userService.createUser.mockResolvedValue(mockUser);
        yield (0, userController_1.createUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    }));
    it('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [{ id: 1, name: 'John Doe' }];
        userService_1.userService.getUsers.mockResolvedValue(mockUsers);
        yield (0, userController_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    }));
    it('should get top users with their latest comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { id: 1, name: 'John Doe', title: 'Post 1', content: 'Great Post!' },
        ];
        userService_1.userService.getTopUsersWithLatestComments.mockResolvedValue(mockUsers);
        yield (0, userController_1.getTopUsersWithLatestComments)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    }));
});
