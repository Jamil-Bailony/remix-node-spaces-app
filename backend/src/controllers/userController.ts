import { NextFunction, Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import * as userService from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users.map(user => ({
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt
        })));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users', details: error });
    }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ 
                error: 'Missing required fields',
                details: 'Username, email, and password are required'
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(username, email, hashedPassword);

        await userService.createUser(newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: any) {
        if (error?.name === 'ConditionalCheckFailedException') {
            res.status(409).json({ 
                error: 'Username already exists',
                details: 'Please choose a different username'
            });
            return;
        }

        res.status(500).json({ error: 'Error registering user', details: error });
    }
};


