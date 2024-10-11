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
exports.getTopUsersWithLatestComments = exports.getUsers = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token } = yield userService_1.userService.createUser(req.body);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.userService.getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getUsers = getUsers;
const getTopUsersWithLatestComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.userService.getTopUsersWithLatestComments();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getTopUsersWithLatestComments = getTopUsersWithLatestComments;
