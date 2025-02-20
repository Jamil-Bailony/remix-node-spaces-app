import { QueryCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { Subscription } from "../models/Subscription";
import dynamoDB from '../config/db';

const TABLE_NAME = process.env.TABLE_NAME!;

export const subscribe = async (spaceId: string, userId: string): Promise<Subscription> => {
    const subscription = new Subscription(spaceId, userId);

    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: subscription,
        ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(SK)'
    });

    try {
        await dynamoDB.send(command);
        return subscription;
    } catch (error: any) {
        if (error.name === 'ConditionalCheckFailedException') {
            throw new Error('Already subscribed to this space');
        }
        throw error;
    }
};

export const unsubscribe = async (spaceId: string, userId: string): Promise<void> => {
    const command = new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
            PK: `SPACE#${spaceId}`,
            SK: `SUBSCRIBER#${userId}`
        }
    });

    await dynamoDB.send(command);
};

export const getSpaceSubscribers = async (spaceId: string): Promise<Subscription[]> => {
    const command = new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :spaceId AND begins_with(SK, :prefix)',
        ExpressionAttributeValues: {
            ':spaceId': `SPACE#${spaceId}`,
            ':prefix': 'SUBSCRIBER#'
        }
    });

    const response = await dynamoDB.send(command);
    return response.Items as Subscription[];
};

export const getUserSubscriptions = async (userId: string): Promise<Subscription[]> => {
    const command = new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :userId AND begins_with(GSI1SK, :prefix)',
        ExpressionAttributeValues: {
            ':userId': `USER#${userId}`,
            ':prefix': 'SUBSCRIPTION#'
        },
        ScanIndexForward: false
    });

    const response = await dynamoDB.send(command);
    return response.Items as Subscription[];
};

export const isSubscribed = async (spaceId: string, userId: string): Promise<boolean> => {
    const command = new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :spaceId AND SK = :subscriberId',
        ExpressionAttributeValues: {
            ':spaceId': `SPACE#${spaceId}`,
            ':subscriberId': `SUBSCRIBER#${userId}`
        }
    });

    const response = await dynamoDB.send(command);
    return Boolean(response.Items && response.Items.length > 0);
};
