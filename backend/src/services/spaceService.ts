import { GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import dynamoDB from '../config/db';
import { ISpace } from '../models/Space';

const TABLE_NAME = 'Spaces';

export const createSpace = async (space: ISpace): Promise<ISpace> => {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: space,
    });
    await dynamoDB.send(command);
    return space;
};

export const getAllSpaces = async (): Promise<ISpace[]> => {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const result = await dynamoDB.send(command);
    return result.Items as ISpace[];
};

export const getSpaceById = async (spaceId: string): Promise<ISpace | null> => {
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: spaceId },
    });
    const result = await dynamoDB.send(command);
    return result.Item as ISpace || null;
};
