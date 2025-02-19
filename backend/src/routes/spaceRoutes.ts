import express from 'express';
import { createSpace, getAllSpaces, getSpaceById } from '../controllers/spaceController';

const router = express.Router();

router.get('/', getAllSpaces);
router.post('/', createSpace);
router.get('/:spaceId', getSpaceById);

export default router;
