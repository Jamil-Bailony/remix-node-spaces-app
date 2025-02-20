import FeedCard from "./FeedCard";
import { Feed, ReactionType } from "~/types";

export default function FeedsList({ feeds }: { feeds: Feed[] }) {

    const handleReaction = async (feedId: string, reactionType: ReactionType) => {
        console.log('Reacting to feed:', feedId, 'with:', reactionType);
    };

    if (feeds.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No feeds yet</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {feeds.map((feed) => (
                <FeedCard
                    key={feed.id}
                    feed={feed}
                    onReact={handleReaction}
                />
            ))}
        </div>
    );
}