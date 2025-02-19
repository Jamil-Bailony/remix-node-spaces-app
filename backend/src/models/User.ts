import { v4 as uuidv4 } from 'uuid';

export interface IUser {
    id: string;
    name: string;
    email: string;
    passwordHash?: string;
    createdAt: string;
    imageUrl?: string;
}

export class User implements IUser {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    passwordHash: string;
    imageUrl?: string;

    constructor(name: string, email: string, passwordHash: string, imageUrl?: string) {
        this.id = uuidv4();
        this.createdAt = new Date().toISOString();
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.imageUrl = imageUrl;
    }
}
