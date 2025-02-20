import { DeleteCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import dynamoDB from '../config/db';
import { Reaction, ReactionTarget, ReactionType } from '../models/Reaction';

const TABLE_NAME = process.env.TABLE_NAME;

export const addReaction = async (
    spaceId: string,
    feedId: string,
    userId: string,
    reactionType: ReactionType,
    targetType: ReactionTarget,
    commentId?: string
): Promise<Reaction> => {
    const reaction = new Reaction(spaceId, feedId, userId, reactionType, targetType, commentId);

    await dynamoDB.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: reaction
    }));

    return reaction;
};

export const removeReaction = async (
    spaceId: string,
    feedId: string,
    userId: string,
    targetType: ReactionTarget,
    commentId?: string
): Promise<void> => {
    const SK = commentId
        ? `FEED#${feedId}#COMMENT#${commentId}#REACTION#${userId}`
        : `FEED#${feedId}#REACTION#${userId}`;

    await dynamoDB.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
            PK: `SPACE#${spaceId}`,
            SK
        }
    }));
};
