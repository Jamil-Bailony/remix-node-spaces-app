import express from 'express';
import { getUsers } from '../controllers/userController';
import { getUserSubscriptions } from '../controllers/subscriptionController';

const router = express.Router();
router.get('/', getUsers);
router.get('/:userId/subscriptions', getUserSubscriptions);

export default router;
