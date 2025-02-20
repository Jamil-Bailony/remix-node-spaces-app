import { v4 as uuidv4 } from 'uuid';

export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';
export type ReactionTarget = 'FEED' | 'COMMENT';

export interface IReaction {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'REACTION';
    id: string;
    spaceId: string;
    feedId: string;
    commentId?: string;  // for comment reactions
    userId: string;
    reactionType: ReactionType;
    targetType: ReactionTarget;
    createdAt: string;
}

export class Reaction implements IReaction {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'REACTION';
    id: string;
    spaceId: string;
    feedId: string;
    commentId?: string;
    userId: string;
    reactionType: ReactionType;
    targetType: ReactionTarget;
    createdAt: string;

    constructor(
        spaceId: string,
        feedId: string,
        userId: string,
        reactionType: ReactionType,
        targetType: ReactionTarget,
        commentId?: string
    ) {
        this.id = uuidv4();
        this.createdAt = new Date().toISOString();
        this.spaceId = spaceId;
        this.feedId = feedId;
        this.userId = userId;
        this.reactionType = reactionType;
        this.targetType = targetType;
        this.commentId = commentId;

        this.PK = `SPACE#${spaceId}`;
        this.SK = commentId
            ? `FEED#${feedId}#REACTION#COMMENT#${commentId}#REACTOR#${userId}`
            : `FEED#${feedId}#REACTION#REACTOR#${userId}`;
        this.GSI1PK = `USER#${userId}`;
        this.GSI1SK = `REACTION#${this.createdAt}`;
        this.type = 'REACTION';
    }
}