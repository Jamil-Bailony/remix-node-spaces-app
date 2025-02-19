import { v4 as uuidv4 } from 'uuid';

export interface IUser {
    id: string;
    username: string;
    email: string;
    passwordHash?: string;
    createdAt: string;
}

export class User implements IUser {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;

    constructor(username: string, email: string, passwordHash: string) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = new Date().toISOString();
    }
}
