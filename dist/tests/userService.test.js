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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = require("../services/userService");
const database_1 = require("../config/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock('../config/database');
jest.mock('jsonwebtoken');
describe('userService', () => {
    const userRepo = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
    };
    beforeEach(() => {
        database_1.AppDataSource.getRepository.mockReturnValue(userRepo);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
        userRepo.create.mockReturnValue(mockUser);
        userRepo.save.mockResolvedValue(mockUser);
        jsonwebtoken_1.default.sign.mockReturnValue('mockToken');
        const result = yield userService_1.userService.createUser(mockUser);
        expect(userRepo.create).toHaveBeenCalledWith(mockUser);
        expect(userRepo.save).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual({ user: mockUser, token: 'mockToken' });
    }));
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = [{ id: 1, name: 'Test User' }];
        userRepo.find.mockResolvedValue(users);
        const result = yield userService_1.userService.getUsers();
        expect(userRepo.find).toHaveBeenCalled();
        expect(result).toEqual(users);
    }));
    it('should get top users with their latest comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockQueryResult = [{ id: 1, name: 'User 1', title: 'Post 1', content: 'Comment 1' }];
        database_1.AppDataSource.query.mockResolvedValue(mockQueryResult);
        const result = yield userService_1.userService.getTopUsersWithLatestComments();
        expect(database_1.AppDataSource.query).toHaveBeenCalled();
        expect(result).toEqual(mockQueryResult);
    }));
});
