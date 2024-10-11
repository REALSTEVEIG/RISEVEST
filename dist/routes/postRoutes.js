"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
router.post('/:id/posts', postController_1.createPost);
router.get('/:id/posts', postController_1.getPostsByUser);
exports.default = router;
