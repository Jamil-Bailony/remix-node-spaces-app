import { Request, Response } from 'express';
import * as subscriptionService from '../services/subscriptionService';

// TODO integrate
export const subscribeToSpace = async (req: Request, res: Response) => {
    try {
        const { spaceId } = req.params;
        const { userId } = req.body; // TODO authenticated user, workaround

        const subscription = await subscriptionService.subscribe(spaceId, userId);
        res.status(201).json(subscription);
    } catch (error: any) {
        if (error.message === 'Already subscribed to this space') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error subscribing to space' });
        }
    }
};

// TODO integrate
export const unsubscribeFromSpace = async (req: Request, res: Response) => {
    try {
        const { spaceId } = req.params;
        const { userId } = req.body;

        await subscriptionService.unsubscribe(spaceId, userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error unsubscribing from space' });
    }
};

export const getUserSubscriptions = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const subscriptions = await subscriptionService.getUserSubscriptions(userId);
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user subscriptions' });
    }
};

