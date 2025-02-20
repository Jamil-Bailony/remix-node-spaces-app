
export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';
export type ReactionTarget = 'FEED' | 'COMMENT';

type Reaction = {
    id: string;
    spaceId: string;
    feedId: string;
    commentId?: string;
    userId: string;
    reactionType: ReactionType;
    targetType: ReactionTarget;
    createdAt: string;
}

export default Reaction;