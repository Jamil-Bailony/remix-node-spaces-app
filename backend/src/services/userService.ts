import dynamoDB from '../config/db';
import { IUser } from '../models/User';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.TABLE_NAME!;

// TODO add pagination/limit
export const getAllUsers = async (): Promise<IUser[]> => {
    const command = new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'begins_with(PK, :pk) AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': 'USER#',
            ':sk': 'METADATA'
        }
    });

    const result = await dynamoDB.send(command);
    return result.Items as IUser[];
};
