import { Request, Response } from 'express';
import * as feedService from '../services/feedService';

export const createFeed = async (req: Request, res: Response) => {
    try {
        const { spaceId } = req.params;
        const { userId, title, body, imageUrl } = req.body;

        const feed = await feedService.createFeed(
            spaceId,
            userId,
            title,
            body,
            imageUrl
        );

        res.status(201).json(feed);
    } catch (error) {
        console.error('Error creating feed:', error);
        res.status(500).json({ error: 'Error creating feed' });
    }
};

export const getSpaceFeeds = async (req: Request, res: Response) => {
    try {
        const { spaceId } = req.params;
        const { userId } = req.query; // TODO authenticated user or get it from front

        const feeds = await feedService.getSpaceFeedsWithRelations(
            spaceId,
            userId as string
        );

        res.status(200).json(feeds);
    } catch (error) {
        console.error('Error fetching feeds:', error);
        res.status(500).json({ error: 'Error fetching feeds' });
    }
};

export const deleteFeed = async (req: Request, res: Response) => {
    try {
        const { spaceId, feedId } = req.params;
        const { userId } = req.body;

        await feedService.deleteFeed(spaceId, feedId, userId);
        res.status(204).send();
    } catch (error: any) {
        if (error.message === 'Feed not found') {
            res.status(404).json({ error: 'Feed not found' });
        } else if (error.message === 'Unauthorized to delete this feed') {
            res.status(403).json({ error: 'Unauthorized to delete this feed' });
        } else {
            console.error('Error deleting feed:', error);
            res.status(500).json({ error: 'Error deleting feed' });
        }
    }
};


