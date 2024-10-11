import { Router } from 'express';
import { createUser, getTopUsersWithLatestComments, getUsers } from '../controllers/userController';
import { validateUser } from '../middleware/validator';

const router = Router();

router.post('/', validateUser, createUser);
router.get('/', getUsers);
router.get('/top', getTopUsersWithLatestComments);


export default router;
