import express from 'express';
import { createSpace, getAllSpaces, getSpace } from '../controllers/spaceController';
import { subscribeToSpace, unsubscribeFromSpace } from '../controllers/subscriptionController';
import { createFeed, deleteFeed, getSpaceFeeds } from '../controllers/feedController';
import { addReaction, removeReaction } from '../controllers/reactionController';
import { createComment, deleteComment, getFeedComments } from '../controllers/commentController';

const router = express.Router();

router.get('/', getAllSpaces);
router.post('/', createSpace);
router.get('/:spaceId', getSpace);
router.post('/:spaceId/subscribe', subscribeToSpace);
router.delete('/:spaceId/subscribe', unsubscribeFromSpace);

// feeds
router.post('/:spaceId/feeds', createFeed);
router.get('/:spaceId/feeds', getSpaceFeeds);
router.post('/:spaceId/feeds', createFeed);
router.delete('/:spaceId/feeds/:feedId', deleteFeed);

// comments
router.get('/:spaceId/feeds/:feedId/comments', getFeedComments);
router.post('/:spaceId/feeds/:feedId/comments', createComment);
router.post('/:spaceId/feeds/:feedId/comments/:parentId/replies', createComment);
router.delete('/:spaceId/feeds/:feedId/comments/:commentId', deleteComment);

// reactions
router.post('/:spaceId/feeds/:feedId/reactions', addReaction);
router.post('/:spaceId/feeds/:feedId/comments/:commentId/reactions', addReaction);
router.delete('/:spaceId/feeds/:feedId/reactions', removeReaction);
router.delete('/:spaceId/feeds/:feedId/comments/:commentId/reactions', removeReaction);


export default router;
