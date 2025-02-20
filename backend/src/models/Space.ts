import { v4 as uuidv4 } from 'uuid';

export interface ISpace {
    id: string;
    createdAt: string;
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'SPACE';
    title: string;
    description: string;
    bannerImage?: string;
    authorId: string;
}

export class Space implements ISpace {
    id: string;
    createdAt: string;
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'SPACE';
    title: string;
    description: string;
    bannerImage?: string;
    authorId: string;

    constructor(authorId: string, title: string, description: string, bannerImage?: string) {
        this.id = uuidv4();
        this.createdAt = new Date().toISOString();

        this.PK = `SPACE#${this.id}`;
        this.SK = 'METADATA';
        this.GSI1PK = `USER#${authorId}`; // groups all spaces
        this.GSI1SK = `CREATED#${this.createdAt}#${this.id}`; // sort by creation date
        this.type = 'SPACE';

        this.title = title;
        this.description = description;
        this.bannerImage = bannerImage;
        this.authorId = authorId;
    }
}
