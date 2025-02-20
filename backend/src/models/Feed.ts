import { v4 as uuidv4 } from 'uuid';

export interface IFeed {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'FEED';
    id: string;
    spaceId: string;
    authorId: string;
    title: string;
    body: string;
    imageUrl?: string;
    createdAt: string;
}

export class Feed implements IFeed {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'FEED';
    id: string;
    spaceId: string;
    authorId: string;
    title: string;
    body: string;
    imageUrl?: string;
    createdAt: string;

    constructor(spaceId: string, authorId: string, title: string, body: string, imageUrl?: string) {
        this.id = uuidv4();
        this.createdAt = new Date().toISOString();

        this.PK = `SPACE#${spaceId}`;
        this.SK = `FEED#${this.id}`;
        this.GSI1PK = `USER#${authorId}`;
        this.GSI1SK = `FEED#${this.createdAt}`;
        this.type = 'FEED';

        this.spaceId = spaceId;
        this.authorId = authorId;
        this.title = title;
        this.body = body;
        this.imageUrl = imageUrl;
    }
}
