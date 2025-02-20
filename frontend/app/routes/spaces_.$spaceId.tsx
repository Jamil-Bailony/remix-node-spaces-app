import { LoaderFunctionArgs } from "@remix-run/node";
import { data, MetaFunction, Outlet, redirect, useAsyncValue, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import AuthorCard from "~/components/AuthorCard";
import FeedsList from "~/components/FeedList";
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

    return data({ space, feeds });
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

                    <div className="mt-6">
                        <AuthorCard imageUrl={space.author?.imageUrl} name={space.author?.name} role="Creator" />
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
                        <FeedsList feeds={feeds} />
                    </div>
                </div>
            </div>
        </div>
    );
}