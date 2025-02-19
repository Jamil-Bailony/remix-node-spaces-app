import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { th } from "@faker-js/faker/.";
import dotenv from 'dotenv';
dotenv.config();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fake',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fake'
    }
});

const dynamoDB = DynamoDBDocumentClient.from(client);

export default dynamoDB;
