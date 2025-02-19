import express from 'express';
import { registerUser, getUsers } from '../controllers/userController';

const router = express.Router();
router.get('/', getUsers);
router.post('/', registerUser);

export default router;
