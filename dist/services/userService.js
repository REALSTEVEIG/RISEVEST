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
exports.userService = void 0;
const database_1 = require("../config/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
exports.userService = {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = database_1.AppDataSource.getRepository(user_1.User);
            const newUser = userRepo.create(data);
            yield userRepo.save(newUser);
            const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });
            return { user: newUser, token };
        });
    },
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = database_1.AppDataSource.getRepository(user_1.User);
            return yield userRepo.find();
        });
    },
    getTopUsersWithLatestComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT u.id, u.name, p.title, c.content
      FROM "user" u
      JOIN "post" p ON u.id = p."userId"
      LEFT JOIN "comment" c ON p.id = c."postId"
      WHERE c."createdAt" = (
        SELECT MAX(c2."createdAt")
        FROM "comment" c2
        WHERE c2."postId" = p.id
      )
      GROUP BY u.id, p.id, c.id
      ORDER BY COUNT(p.id) DESC
      LIMIT 3;
    `;
            const result = yield database_1.AppDataSource.query(query);
            return result;
        });
    }
};
