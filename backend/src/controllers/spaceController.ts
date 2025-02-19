import { Request, Response } from 'express';
import { Space } from '../models/Space';
import * as spaceService from '../services/spaceService';

export const createSpace = async (req: Request, res: Response) => {
    try {
        const { title, description, bannerImage } = req.body;
        const newSpace = new Space(title, description, bannerImage);

        await spaceService.createSpace(newSpace);
        res.status(201).json({ message: 'Space created successfully', space: newSpace });
    } catch (error) {
        res.status(500).json({ error: 'Error creating space' });
    }
};

export const getAllSpaces = async (req: Request, res: Response) => {
    try {
        const spaces = await spaceService.getAllSpaces();
        res.status(200).json(spaces);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching spaces' });
    }
};

export const getSpaceById = async (
    req: Request, 
    res: Response, 
): Promise<void> => {
    try {
        const { spaceId } = req.params;
        const space = await spaceService.getSpaceById(spaceId);
        if (!space) {
            res.status(404).json({ error: 'Space not found' });
            return;
        }

        res.status(200).json(space);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching space details' });
    }
};

