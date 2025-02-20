import { useState } from "react";
import AuthorCard from "./AuthorCard";
import { Feed, ReactionType } from "~/types";
import CommentsBox from "./CommentsBox";

interface Author {
    id: string;
    name: string;
    imageUrl: string;
}

interface Reaction {
    total: number;
    types: ReactionType[];
    userId: string;
}

interface FeedCardProps {
    feed: Feed & {
        "reactions": {
            "total": number,
            "types": {
                [key in ReactionType]: number;
            };
            userReaction: undefined | Reaction;
        },
        author: Author;
    };
    onReact: (feedId: string, reactionType: ReactionType) => void;
}

const reactionIcons: Record<ReactionType, string> = {
    LIKE: "👍",
    LOVE: "❤️",
    HAHA: "😄",
    WOW: "😮",
    SAD: "😢",
    ANGRY: "😠"
};

export default function FeedCard({ feed, onReact }: FeedCardProps) {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 flex items-center space-x-3">
                <AuthorCard imageUrl={feed.author?.imageUrl} name={feed.author?.name} role={new Date().toLocaleDateString()} />
            </div>

            <div className="px-4 pb-3">
                <h2 className="text-xl font-semibold mb-2">
                    {feed.title}
                </h2>
                <p className="text-gray-600">
                    {feed.body}
                </p>
            </div>

            {feed.imageUrl && (
                <div className="relative w-full max-w-lg mx-auto">
                    <img
                        src={feed.imageUrl}
                        alt={feed.title}
                        className="w-full h-full"
                    />
                </div>
            )}

            <div className="px-4 py-2 mt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                        {Object.entries(feed.reactions.types)
                            .filter(([_, count]) => count > 0)
                            .slice(0, 3)
                            .map(([type]) => (
                                <span
                                    key={type}
                                    className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs"
                                >
                                    {reactionIcons[type as ReactionType]}
                                </span>
                            ))}
                    </div>
                    <span>{feed.reactions.total}</span>
                </div>
                <button onClick={() => setShowComments(true)}>
                    {feed.comments?.length} comments
                </button>
            </div>

            <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
                <AddReactionAction onReact={onReact} />
                <button onClick={() => setShowComments(!showComments)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Comment</span>
                </button>
            </div>
            {showComments && <CommentsBox feedId={feed.id} />}
        </div>
    );
}

function AddReactionAction({ onReact }: FeedCardProps["onReact"]) {
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    // TODO handle adding reaction
    return (
        <div className="relative">

            <button
                onClick={() => setShowReactionPicker(!showReactionPicker)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center space-x-2"
            >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.075 6C14.417 6 14.75 5.712 14.75 5.325V3.75H16.325C16.667 3.75 17 3.462 17 3.075C17 2.697 16.703 2.4 16.325 2.4H14.75V0.825C14.75 0.446999 14.453 0.149999 14.075 0.149999C13.697 0.149999 13.4 0.446999 13.4 0.825V2.4H11.825C11.447 2.4 11.15 2.697 11.15 3.075C11.15 3.444 11.447 3.75 11.825 3.75H13.4V5.325C13.4 5.694 13.697 6 14.075 6ZM8 16.35C11.978 16.35 15.2 13.128 15.2 9.15C15.2 8.745 15.164 8.322 15.092 7.899C15.038 7.593 14.75 7.35 14.426 7.35C14.057 7.35 13.751 7.656 13.751 8.025C13.751 8.178 13.85 8.583 13.85 9.15C13.85 12.381 11.231 15 8 15C4.769 15 2.15 12.381 2.15 9.15C2.15 5.919 4.769 3.3 8 3.3C8.459 3.3 9.017 3.399 9.125 3.399C9.494 3.399 9.8 3.093 9.8 2.724C9.8 2.391 9.548 2.139 9.242 2.058C9.026 2.004 8.603 1.95 8 1.95C4.022 1.95 0.8 5.172 0.8 9.15C0.8 13.128 4.022 16.35 8 16.35ZM5.75 8.7C6.497 8.7 7.1 8.097 7.1 7.35C7.1 6.603 6.497 6 5.75 6C5.003 6 4.4 6.603 4.4 7.35C4.4 8.097 5.003 8.7 5.75 8.7ZM10.25 8.7C10.997 8.7 11.6 8.097 11.6 7.35C11.6 6.603 10.997 6 10.25 6C9.503 6 8.9 6.603 8.9 7.35C8.9 8.097 9.503 8.7 10.25 8.7ZM8 13.65C10.583 13.65 11.6 11.67 11.6 10.725C11.6 10.365 11.321 10.05 10.925 10.05H5.075C4.679 10.05 4.4 10.365 4.4 10.725C4.4 11.706 5.453 13.65 8 13.65Z" fill="black" fill-opacity="0.6" />
                </svg>
            </button>

            {showReactionPicker && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex space-x-2">
                    {Object.entries(reactionIcons).map(([type, icon]) => (
                        <button
                            key={type}
                            onClick={() => {
                                onReact(feed.id, type as ReactionType);
                                setShowReactionPicker(false);
                            }}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            )}
        </div>

    )
}