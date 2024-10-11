import { Router } from 'express';
import { createPost, getPostsByUser } from '../controllers/postController';

const router = Router();

router.post('/:id/posts', createPost);
router.get('/:id/posts', getPostsByUser);

export default router;
