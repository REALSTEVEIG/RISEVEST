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
exports.commentService = void 0;
const database_1 = require("../config/database");
const comment_1 = require("../models/comment");
const post_1 = require("../models/post");
exports.commentService = {
    addComment(postId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentRepo = database_1.AppDataSource.getRepository(comment_1.Comment);
            const postRepo = database_1.AppDataSource.getRepository(post_1.Post);
            const post = yield postRepo.findOneBy({ id: Number(postId) });
            if (!post)
                throw new Error('Post not found');
            const comment = commentRepo.create(Object.assign(Object.assign({}, data), { post }));
            return yield commentRepo.save(comment);
        });
    }
};
