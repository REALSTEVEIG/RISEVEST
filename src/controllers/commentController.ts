import { Request, Response } from 'express';
import { commentService } from '../services/commentService';

export const addComment = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.addComment(req.params.postId, req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
