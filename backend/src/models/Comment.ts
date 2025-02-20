import { v4 as uuidv4 } from 'uuid';


export interface IComment {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'COMMENT';
    id: string;
    spaceId: string;
    feedId: string;
    parentId?: string;
    authorId: string;
    body: string;
    level: number;
    createdAt: string;
}

export class Comment implements IComment {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'COMMENT';
    id: string;
    spaceId: string;
    feedId: string;
    parentId?: string;
    authorId: string;
    body: string;
    level: number;
    createdAt: string;

    constructor(
        spaceId: string,
        feedId: string,
        authorId: string,
        body: string,
        parentId?: string,
        level: number = 1
    ) {
        this.id = uuidv4();
        this.createdAt = new Date().toISOString();

        this.spaceId = spaceId;
        this.feedId = feedId;
        this.authorId = authorId;
        this.body = body;
        this.parentId = parentId;
        this.level = level;

        this.PK = `SPACE#${spaceId}`;
        this.SK = parentId
            ? `FEED#${feedId}#COMMENT#${parentId}#REPLY#${this.id}`
            : `FEED#${feedId}#COMMENT#${this.id}`;
        this.GSI1PK = `USER#${authorId}`;
        this.GSI1SK = `COMMENT#${this.createdAt}`;
        this.type = 'COMMENT';
    }
}