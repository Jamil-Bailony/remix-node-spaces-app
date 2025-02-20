type Comment = {
    id: string;
    spaceId: string;
    feedId: string;
    parentId?: string;
    authorId: string;
    body: string;
    level: number;
    createdAt: string;
    // relations
    replies?: Comment[];
    author?: {
        id: string;
        imageUrl: string;
        name: string;
    }
}

export default Comment;