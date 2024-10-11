"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validateUser = [
    (0, express_validator_1.body)('name').isString().withMessage('Name must be a string'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid'),
];
