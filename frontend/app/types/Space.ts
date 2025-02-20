type Space = {
    id: string;
    createdAt: string;
    title: string;
    description: string;
    bannerImage?: string;
    authorId: string;
    stats?: {
        subscribersCount: number;
        feedsCount: number;
    }
}

export default Space;