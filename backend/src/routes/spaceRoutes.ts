import express from 'express';
import { createSpace, getAllSpaces, getSpace } from '../controllers/spaceController';
import { checkSubscription, getSpaceSubscribers, subscribeToSpace, unsubscribeFromSpace } from '../controllers/subscriptionController';
import { createFeed, deleteFeed, getSpaceFeeds, getUserReactions } from '../controllers/feedController';
import { addReaction, getReactions, removeReaction } from '../controllers/reactionController';
import { createComment, deleteComment, getFeedComments } from '../controllers/commentController';

const router = express.Router();

router.get('/', getAllSpaces); // used
router.post('/', createSpace);
router.get('/:spaceId', getSpace);  // used

// feeds
router.get('/:spaceId/feeds', getSpaceFeeds); // used



export default router;
