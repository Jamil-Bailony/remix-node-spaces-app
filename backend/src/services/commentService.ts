import dynamoDB from '../config/db';
import { DeleteCommand, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Comment } from '../models/Comment';

const TABLE_NAME = process.env.TABLE_NAME;
const MAX_COMMENT_LEVEL = 4;

export const createComment = async (
    spaceId: string,
    feedId: string,
    authorId: string,
    body: string,
    parentId?: string
): Promise<Comment> => {
    // reply
    if (parentId) {
        const parentComment = await getComment(spaceId, feedId, parentId);
        if (!parentComment) {
            throw new Error('Parent comment not found');
        }
        if (parentComment.level >= MAX_COMMENT_LEVEL) {
            throw new Error('Maximum comment nesting level reached');
        }

        const comment = new Comment(
            spaceId,
            feedId,
            authorId,
            body,
            parentId,
            parentComment.level + 1
        );

        await dynamoDB.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: comment
        }));

        return comment;
    }

    // Create top-level comment
    const comment = new Comment(spaceId, feedId, authorId, body);
    await dynamoDB.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: comment
    }));

    return comment;
};

export const getComment = async (
    spaceId: string,
    feedId: string,
    commentId: string
): Promise<Comment | null> => {
    // TODO check why getting error when using PK,SK with comment id
    const result = await dynamoDB.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#id = :id',
        ExpressionAttributeNames: {
            '#id': 'id'
        },
        ExpressionAttributeValues: {
            ':pk': `SPACE#${spaceId}`,
            ':sk': `FEED#${feedId}#COMMENT#`,
            ':id': commentId
        }
    }));

    return result.Items?.[0] as Comment || null;
};

interface CommentWithReplies extends Comment {
    replies?: CommentWithReplies[];
}

export const getFeedComments = async (
    spaceId: string,
    feedId: string
): Promise<CommentWithReplies[]> => {
    const result = await dynamoDB.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ProjectionExpression: 'id, authorId, body, createdAt, #level, parentId, feedId, #type',
        ExpressionAttributeNames: {
            '#level': 'level',
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':pk': `SPACE#${spaceId}`,
            ':sk': `FEED#${feedId}#COMMENT#`,
        },
    }));

    const comments = result.Items as Comment[];
    if (!comments?.length) return [];

    const commentMap = new Map<string, CommentWithReplies>();
    const topLevelComments: CommentWithReplies[] = [];

    // check a way of using dynamo query for sorting by date
    const sortedCommentsByDate = comments.sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const commentPromises = sortedCommentsByDate.map(async comment => {
        const authorData = await dynamoDB.send(new GetCommand({
            TableName: TABLE_NAME,
            ProjectionExpression: 'id, #name, imageUrl',
            ExpressionAttributeNames: {
                '#name': 'name'
            },
            Key: {
                PK: `USER#${comment.authorId}`,
                SK: 'METADATA'
            }
        }));

        const commentTreeMap = {
            ...comment,
            author: authorData.Item,
            replies: [],
        };
        commentMap.set(comment.id, commentTreeMap);
        return commentTreeMap;
    });

    await Promise.all(commentPromises);

    comments.forEach(comment => {
        if (!comment.parentId) {
            topLevelComments.push(commentMap.get(comment.id)!);
        } else {
            const parent = commentMap.get(comment.parentId);
            if (parent) {
                parent.replies = parent.replies || [];
                parent.replies.push(commentMap.get(comment.id)!);
            }
        }
    });

    return topLevelComments;
};

export const deleteComment = async (
    spaceId: string,
    feedId: string,
    commentId: string,
    authorId: string
): Promise<void> => {
    const comment = await getComment(spaceId, feedId, commentId);

    if (!comment) {
        throw new Error('Comment not found');
    }

    if (comment.authorId !== authorId) {
        throw new Error('Unauthorized to delete this comment');
    }

    await dynamoDB.send(new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
            PK: comment.PK,
            SK: comment.SK
        }
    }));

    const replies = await dynamoDB.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `SPACE#${spaceId}`,
            ':sk': `FEED#${feedId}#COMMENT#${commentId}#REPLY#`
        }
    }));

    if (replies.Items?.length) {
        await Promise.all(
            replies.Items.map(reply =>
                dynamoDB.send(new DeleteCommand({
                    TableName: TABLE_NAME,
                    Key: {
                        PK: reply.PK,
                        SK: reply.SK
                    }
                }))
            )
        );
    }

    const reactions = await dynamoDB.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `SPACE#${spaceId}`,
            ':sk': `FEED#${feedId}#COMMENT#${commentId}#REACTION#`
        }
    }));

    if (reactions.Items?.length) {
        await Promise.all(
            reactions.Items.map(reaction =>
                dynamoDB.send(new DeleteCommand({
                    TableName: TABLE_NAME,
                    Key: {
                        PK: reaction.PK,
                        SK: reaction.SK
                    }
                }))
            )
        );
    }
};
