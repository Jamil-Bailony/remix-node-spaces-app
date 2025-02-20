import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users.map(user => ({
            id: user.id,
            email: user.email,
            username: user.name,
            createdAt: user.createdAt,
            imageUrl: user.imageUrl
        })));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users', details: error });
    }
}
