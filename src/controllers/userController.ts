import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user, token } = await userService.createUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getTopUsersWithLatestComments = async (req: Request, res: Response) => {
  try {
    const users = await userService.getTopUsersWithLatestComments();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
