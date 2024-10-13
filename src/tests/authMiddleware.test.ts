import { authMiddleware } from '../middleware/authMiddleware';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 401 if no token is provided', () => {
    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should call next if token is valid', () => {
    const token = 'valid_token';
    mockRequest.headers = { authorization: token };

    (jwt.verify as jest.Mock).mockReturnValue({ id: 1, email: 'test@example.com' });

    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    const token = 'invalid_token';
    mockRequest.headers = { authorization: token };

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Forbidden' });
  });
});
