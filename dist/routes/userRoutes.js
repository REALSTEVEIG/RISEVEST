"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
router.post('/', validator_1.validateUser, userController_1.createUser);
router.get('/', userController_1.getUsers);
router.get('/top', userController_1.getTopUsersWithLatestComments);
exports.default = router;
