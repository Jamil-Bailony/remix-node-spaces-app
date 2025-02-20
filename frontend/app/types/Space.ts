type Space = {
    // attributes
    id: string;
    createdAt: string;
    title: string;
    description: string;
    authorId: string;
    bannerImage?: string;
    // relations/joins
    stats?: {
        subscribersCount: number;
        feedsCount: number;
    };
    author?: {
        id: string;
        name: string;
        imageUrl: string;
    }
}

export default Space;