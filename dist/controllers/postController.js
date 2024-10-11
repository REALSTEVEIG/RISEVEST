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
exports.getPostsByUser = exports.createPost = void 0;
const postService_1 = require("../services/postService");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postService_1.postService.createPost(req.params.id, req.body);
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createPost = createPost;
const getPostsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postService_1.postService.getPostsByUser(req.params.id);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getPostsByUser = getPostsByUser;
