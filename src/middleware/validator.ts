import { body } from 'express-validator';

export const validateUser = [
  body('name').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Email must be valid'),
];
