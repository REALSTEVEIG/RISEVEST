import { Request, Response } from 'express';
import { postService } from '../services/postService';

export const createPost = async (req: Request, res: Response) => {
    try {
        const post = await postService.createPost(req.params.id, req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getPostsByUser = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getPostsByUser(req.params.id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
