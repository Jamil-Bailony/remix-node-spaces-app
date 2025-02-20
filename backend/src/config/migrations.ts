import { CreateTableCommand, KeyType, ScalarAttributeType, ProjectionType } from "@aws-sdk/client-dynamodb";
import dynamoDB from './db'

const table = {
    TableName: process.env.TABLE_NAME || 'Spaces',
    KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH' as KeyType },
        { AttributeName: 'SK', KeyType: 'RANGE' as KeyType },
    ],
    AttributeDefinitions: [
        { AttributeName: 'PK', AttributeType: 'S' as ScalarAttributeType },
        { AttributeName: 'SK', AttributeType: 'S' as ScalarAttributeType },
        { AttributeName: 'GSI1PK', AttributeType: 'S' as ScalarAttributeType },
        { AttributeName: 'GSI1SK', AttributeType: 'S' as ScalarAttributeType },
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'GSI1',
            KeySchema: [
                { AttributeName: 'GSI1PK', KeyType: 'HASH' as KeyType },
                { AttributeName: 'GSI1SK', KeyType: 'RANGE' as KeyType },
            ],
            Projection: {
                ProjectionType: ProjectionType.ALL
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}

export async function runMigrations() {
    console.log('Starting database migrations...');

    try {
        console.log(`Creating table: ${table.TableName}`);
        const command = new CreateTableCommand(table);
        await dynamoDB.send(command);
        console.log(`Table ${table.TableName} created successfully`);

        // Wait a bit for the table to be active
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
        if (error.name === 'ResourceInUseException') {
            console.log(`Table ${table.TableName} already exists`);
        } else {
            console.error(`Error creating table ${table.TableName}:`, error);
            throw error;
        }
    }

    console.log('Database migrations completed successfully');
}
