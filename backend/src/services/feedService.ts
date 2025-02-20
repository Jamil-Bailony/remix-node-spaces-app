import { DeleteCommand, PutCommand, QueryCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import dynamoDB from '../config/db';
import { Feed, IFeed } from '../models/Feed';
import { Reaction } from '../models/Reaction';
import { Comment } from '../models/Comment';

const TABLE_NAME = process.env.TABLE_NAME;

interface FeedWithRelations extends IFeed {
    comments: Comment[];
    reactions: {
        total: number;
        types: Record<string, number>;
        userReaction?: Reaction;
    };
}

export const createFeed = async (
    spaceId: string,
    authorId: string,
    title: string,
    body: string,
    imageUrl?: string
): Promise<Feed> => {
    const feed = new Feed(spaceId, authorId, title, body, imageUrl);

    await dynamoDB.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: feed
    }));

    return feed;
};

export const getSpaceFeedsWithRelations = async (
    spaceId: string,
    userId?: string
): Promise<FeedWithRelations[]> => {
    // Get all feeds in the space
    const feedsResponse = await dynamoDB.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ProjectionExpression: 'id, authorId, title, body, imageUrl, createdAt',
        FilterExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':pk': `SPACE#${spaceId}`,
            ':sk': 'FEED#',
            ':type': 'FEED'
        }
    }));

    const feeds = feedsResponse.Items as Feed[];
    if (!feeds?.length) return [];

    // relations
    const feedsWithRelations = await Promise.all(feeds.map(async (feed) => {
        const [comments, reactions, author] = await Promise.all([
            // comments
            dynamoDB.send(new QueryCommand({
                TableName: TABLE_NAME,
                KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
                FilterExpression: '#type = :type',
                ExpressionAttributeNames: {
                    '#type': 'type'
                },
                ExpressionAttributeValues: {
                    ':pk': `SPACE#${spaceId}`,
                    ':sk': `FEED#${feed.id}#COMMENT#`,
                    ':type': 'COMMENT'
                }
            })),

            // reactions
            dynamoDB.send(new QueryCommand({
                TableName: TABLE_NAME,
                KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
                ExpressionAttributeValues: {
                    ':pk': `SPACE#${spaceId}`,
                    ':sk': `FEED#${feed.id}#REACTION#`
                }
            })),

            // author details
            dynamoDB.send(new GetCommand({
                TableName: TABLE_NAME,
                Key: {
                    PK: `USER#${feed.authorId}`,
                    SK: 'METADATA'
                },
                ProjectionExpression: 'id, #name, imageUrl',
                ExpressionAttributeNames: {
                    '#name': 'name'
                }
            }))

        ]);

        const reactionItems = reactions.Items as Reaction[];
        const reactionCounts = reactionItems.reduce((acc, reaction) => {
            acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            ...feed,
            comments: comments.Items as Comment[],
            reactions: {
                total: reactionItems.length,
                types: reactionCounts,
                userReaction: userId ?
                    reactionItems.find(r => r.userId === userId) :
                    undefined
            },
            author: author.Item
        };
    }));

    return feedsWithRelations;
};

export const getUserReactions = async (userId: string) => {
    const command = new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :pk AND begins_with(GSI1SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `USER#${userId}`,
            ':sk': 'REACTION#'
        }
    });

    const response = await dynamoDB.send(command);
    return response.Items as Reaction[];
};

export const deleteFeed = async (
    spaceId: string,
    feedId: string,
    authorId: string
): Promise<void> => {
    // First get the feed to verify ownership
    const feed = await dynamoDB.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: {
            PK: `SPACE#${spaceId}`,
            SK: `FEED#${feedId}`
        }
    }));

    if (!feed.Item) {
        throw new Error('Feed not found');
    }

    if (feed.Item.authorId !== authorId) {
        throw new Error('Unauthorized to delete this feed');
    }

    // Delete the feed
    await dynamoDB.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
            PK: `SPACE#${spaceId}`,
            SK: `FEED#${feedId}`
        }
    }));

    // Delete all related items (comments and reactions)
    const [comments, reactions] = await Promise.all([
        dynamoDB.send(new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': `SPACE#${spaceId}`,
                ':sk': `FEED#${feedId}#COMMENT#`
            }
        })),
        dynamoDB.send(new QueryCommand({
            TableName: TABLE_NAME,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': `SPACE#${spaceId}`,
                ':sk': `FEED#${feedId}#REACTION#`
            }
        }))
    ]);

    // Delete all related items in batches
    const deleteItems = [...(comments.Items || []), ...(reactions.Items || [])];
    for (let i = 0; i < deleteItems.length; i += 25) {
        const batch = deleteItems.slice(i, i + 25);
        await Promise.all(batch.map(item =>
            dynamoDB.send(new DeleteCommand({
                TableName: TABLE_NAME,
                Key: {
                    PK: item.PK,
                    SK: item.SK
                }
            }))
        ));
    }
};