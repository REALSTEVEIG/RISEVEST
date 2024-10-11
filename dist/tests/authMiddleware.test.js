"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middleware/authMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock('jsonwebtoken');
describe('Auth Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    it('should return 401 if no token is provided', () => {
        (0, authMiddleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
    });
    it('should call next if token is valid', () => {
        const token = 'valid_token';
        mockRequest = { headers: { authorization: token } };
        jsonwebtoken_1.default.verify.mockReturnValue({ id: 1, email: 'test@example.com' });
        (0, authMiddleware_1.authMiddleware)(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
    });
});
