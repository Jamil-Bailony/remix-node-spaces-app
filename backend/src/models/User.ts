import { v4 as uuidv4 } from 'uuid';

export interface IUser {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'USER';
    id: string;
    name: string;
    email: string;
    passwordHash?: string;
    createdAt: string;
    imageUrl?: string;
}

export class User implements IUser {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'USER';
    id: string;
    createdAt: string;
    name: string;
    email: string;
    passwordHash: string;
    imageUrl?: string;

    constructor(name: string, email: string, passwordHash: string, imageUrl?: string) {
        this.id = uuidv4();
        this.createdAt = new Date().toISOString();

        this.PK = `USER#${this.id}`;
        this.SK = 'METADATA';
        this.GSI1PK = `USER#${this.id}`;
        this.GSI1SK = `PROFILE#${this.createdAt}`;
        this.type = 'USER';

        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.imageUrl = imageUrl;
    }
}