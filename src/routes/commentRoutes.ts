import { Router } from 'express';
import { addComment } from '../controllers/commentController';

const router = Router();

router.post('/:postId/comments', addComment);

export default router;
