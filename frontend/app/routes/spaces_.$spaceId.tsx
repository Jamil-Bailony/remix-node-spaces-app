import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, Outlet, redirect, useAsyncValue, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { requestGetFeeds, requestGetSpace } from "~/network";
import { Feed, Space } from "~/types";

interface LoaderData {
    space: Space;
    feeds: Feed[];
}

export const meta: MetaFunction = () => {
    return [
        { title: "Space Details" },
        { name: "description", content: "Space details page" },
    ];
};

export async function loader({ params }: LoaderFunctionArgs) {
    const { spaceId } = params;
    if (!spaceId) {
        throw redirect("/spaces");
    }

    const [space, feeds] = await Promise.all([
        requestGetSpace(spaceId),
        requestGetFeeds(spaceId)
    ])

    if (!space) {
        throw new Response("Space not found", { status: 404 });
    }

    return { space, feeds };
}

export default function SpaceDetailsPage() {
    const { space, feeds } = useLoaderData<LoaderData>();

    return (
        <div className="flex flex-col min-h-screen">
            {/* banner */}
            <div className="relative h-48 md:h-64 w-full">
                <img
                    src={space.bannerImage}
                    alt={space.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* main */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-16 relative z-10">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {space.title}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {space.description}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Subscribe
                        </button>
                    </div>

                    {/* stats */}
                    <div className="mt-6 flex items-center gap-6 border-t border-b border-gray-200 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                            <span>{space.stats?.feedsCount} Feeds</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span>{space.stats?.subscribersCount} Subscribers</span>
                        </div>
                    </div>

                    {/* author */}
                    <div className="mt-6">
                        <div className="flex items-center gap-3">
                            <img
                                src={space.author?.imageUrl || '/default-avatar.png'}
                                alt={space.author?.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    {space.author?.name}
                                </h3>
                                <p className="text-sm text-gray-500">Creator</p>
                            </div>
                        </div>
                    </div>

                    {/* feeds */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Feeds
                            </h2>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                New Feed
                            </button>
                        </div>

                        <Feeds />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Feeds() {
    const { feeds } = useLoaderData<LoaderData>();
    console.log('feeds', feeds);
    const handleReaction = async (feedId: string, reactionType: ReactionType) => {
        // Implement your reaction logic here
        console.log('Reacting to feed:', feedId, 'with:', reactionType);
    };

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

// Loading fallback component
function FeedsSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="p-4 bg-white rounded-lg shadow animate-pulse"
                >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );
}

type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';

interface Reaction {
    type: ReactionType;
    count: number;
}

interface Author {
    id: string;
    name: string;
    imageUrl: string;
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

export function FeedCard({ feed, onReact }: FeedCardProps) {
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    const reactionIcons: Record<ReactionType, string> = {
        LIKE: "👍",
        LOVE: "❤️",
        HAHA: "😄",
        WOW: "😮",
        SAD: "😢",
        ANGRY: "😠"
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Author Section */}
            <div className="p-4 flex items-center space-x-3">
                <img
                    src={feed.author.imageUrl}
                    alt={feed.author.name}
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h3 className="font-medium text-gray-900">
                        {feed.author.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-4 pb-3">
                <h2 className="text-xl font-semibold mb-2">
                    {feed.title}
                </h2>
                <p className="text-gray-600">
                    {feed.body}
                </p>
            </div>

            {/* Image Section */}
            {feed.imageUrl && (
                <div className="relative w-full max-w-lg mx-auto">
                    <img
                        src={feed.imageUrl}
                        alt={feed.title}
                        className="w-full h-full"
                    />
                </div>
            )}
            {/* Stats Section */}
            <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    {/* Reaction Stats */}
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
                <div>
                    {feed.comments.length} comments
                </div>
            </div>

            {/* Actions Section */}
            <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
                {/* Reaction Button */}
                <div className="relative">
                    <button
                        onClick={() => setShowReactionPicker(!showReactionPicker)}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center space-x-2"
                    >
                        <span>😊</span>
                        <span>React</span>
                    </button>

                    {/* Reaction Picker */}
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

                {/* Comment Button */}
                <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Comment</span>
                </button>
            </div>
        </div>
    );
}

