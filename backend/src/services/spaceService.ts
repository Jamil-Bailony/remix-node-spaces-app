import { GetCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import dynamoDB from '../config/db';
import { ISpace } from '../models/Space';

const TABLE_NAME = process.env.TABLE_NAME;

export const createSpace = async (space: ISpace): Promise<ISpace> => {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: space,
    });
    await dynamoDB.send(command);
    return space;
};

interface SpaceWithStats extends ISpace {
    stats: {
        feedsCount: number;
        subscribersCount: number;
    };
}

// TODO implement it with pagination
export const getAllSpaces = async (): Promise<SpaceWithStats[]> => {
    const command = new ScanCommand({
        TableName: TABLE_NAME,
        ProjectionExpression: 'id, title, description, createdAt, bannerImage, authorId',
        FilterExpression: 'begins_with(PK, :pk) AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': 'SPACE#',
            ':sk': 'METADATA'
        }
    });

    const result = await dynamoDB.send(command);
    const spaces = result.Items as ISpace[];

    const spacesWithStats = await Promise.all(
        spaces.map(async (space) => {
            const [feeds, subscribers] = await Promise.all([
                // feeds count
                dynamoDB.send(new QueryCommand({
                    TableName: TABLE_NAME,
                    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
                    FilterExpression: '#type = :type',
                    ExpressionAttributeNames: {
                        '#type': 'type'
                    },
                    ExpressionAttributeValues: {
                        ':pk': `SPACE#${space.id}`,
                        ':sk': 'FEED#',
                        ':type': 'FEED'
                    },
                    Select: 'COUNT'
                })),

                // subscribers count
                dynamoDB.send(new QueryCommand({
                    TableName: TABLE_NAME,
                    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
                    ExpressionAttributeValues: {
                        ':pk': `SPACE#${space.id}`,
                        ':sk': 'SUBSCRIBER#'
                    },
                    Select: 'COUNT'
                }))
            ]);

            return {
                ...space,
                stats: {
                    feedsCount: feeds.Count || 0,
                    subscribersCount: subscribers.Count || 0
                }
            };
        })
    );

    return spacesWithStats;
};

export const getSpaceById = async (spaceId: string): Promise<ISpace | null> => {
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: spaceId },
    });
    const result = await dynamoDB.send(command);
    return result.Item as ISpace || null;
};
