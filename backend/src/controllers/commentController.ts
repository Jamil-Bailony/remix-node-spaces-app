import { Request, Response } from 'express';
import * as commentService from '../services/commentService';

export const createComment = async (req: Request, res: Response) => {
    try {
        const { spaceId, feedId } = req.params;
        const { authorId, body, parentId } = req.body;

        const comment = await commentService.createComment(
            spaceId,
            feedId,
            authorId,
            body,
            parentId
        );

        res.status(201).json(comment);
    } catch (error: any) {
        if (error.message === 'Parent comment not found') {
            res.status(404).json({ error: error.message });
        } else if (error.message === 'Maximum comment nesting level reached') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Error creating comment' });
        }
    }
};

export const getFeedComments = async (req: Request, res: Response) => {
    try {
        const { spaceId, feedId } = req.params;
        const comments = await commentService.getFeedComments(spaceId, feedId);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Error fetching comments' });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { spaceId, feedId, commentId } = req.params;
        const { userId } = req.body;

        await commentService.deleteComment(spaceId, feedId, commentId, userId);
        res.status(204).send();
    } catch (error: any) {
        if (error.message === 'Comment not found') {
            res.status(404).json({ error: error.message });
        } else if (error.message === 'Unauthorized to delete this comment') {
            res.status(403).json({ error: error.message });
        } else {
            console.error('Error deleting comment:', error);
            res.status(500).json({ error: 'Error deleting comment' });
        }
    }
};

