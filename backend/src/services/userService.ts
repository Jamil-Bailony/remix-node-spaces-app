import { QueryCommand } from '@aws-sdk/client-dynamodb';
import dynamoDB from '../config/db';
import { IUser } from '../models/User';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

export const createUser = async (user: IUser): Promise<IUser> => {
    const command = new PutCommand({
        TableName: 'Users',
        Item: user,
        ConditionExpression: 'attribute_not_exists(PK)',
    });
    await dynamoDB.send(command);
    return user;
};

export const getAllUsers = async (): Promise<IUser[]> => {
    const command = new ScanCommand({
        TableName: 'Users',
    });
    const result = await dynamoDB.send(command);
    return result.Items as IUser[];
};

// export const getUserByEmail = async (email: string): Promise<IUser | null> => {
//     if (!email) {
//         return null;
//     }
//     email = email.toLowerCase();

//     const command = new QueryCommand({
//         TableName: 'Users',
//         IndexName: 'email-index',
//         KeyConditionExpression: 'email = :email',
//         ExpressionAttributeValues: { ':email': { S: email } },
//     });

//     const result = await dynamoDB.send(command);
//     if (!result.Items || result.Items.length === 0) {
//         return null;
//     }
//     return result.Items[0] as IUser;
// };
