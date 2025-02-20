import { Request, Response } from 'express';
import * as reactionService from '../services/reactionService';

export const addReaction = async (req: Request, res: Response) => {
    try {
        const { spaceId, feedId, commentId } = req.params;
        const { userId, reactionType, targetType } = req.body;

        const reaction = await reactionService.addReaction(
            spaceId,
            feedId,
            userId,
            reactionType,
            targetType,
            commentId
        );

        res.status(201).json(reaction);
    } catch (error) {
        console.error('Error adding reaction:', error);
        res.status(500).json({ error: 'Error adding reaction' });
    }
};

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const { spaceId, feedId, commentId } = req.params;
        const { userId, targetType } = req.body;

        await reactionService.removeReaction(
            spaceId,
            feedId,
            userId,
            targetType,
            commentId
        );

        res.status(204).send();
    } catch (error) {
        console.error('Error removing reaction:', error);
        res.status(500).json({ error: 'Error removing reaction' });
    }
};
