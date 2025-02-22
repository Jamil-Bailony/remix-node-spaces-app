import { LoaderFunctionArgs } from "@remix-run/node";
import { data, Link, MetaFunction, Outlet, redirect, useAsyncValue, useLoaderData } from "@remix-run/react";
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
            <div className=" flex items-center gap-4 p-4 mx-4 my-2">
                <Link to="/spaces">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.649 10.0144C17.649 10.6628 17.1865 11.1383 16.5217 11.1383H9.10748L5.94237 11.0086L7.73449 12.4928L9.51215 14.2507C9.71449 14.4524 9.84456 14.7262 9.84456 15.0432C9.84456 15.6628 9.36763 16.1239 8.76062 16.1239C8.44266 16.1239 8.18252 16.0374 7.98018 15.8357L3.02295 10.8789C2.71944 10.5764 2.60382 10.3314 2.60382 10.0144C2.60382 9.66857 2.73389 9.42362 3.02295 9.13543L7.98018 4.19307C8.18252 3.97693 8.44266 3.87607 8.76062 3.87607C9.36763 3.87607 9.84456 4.35157 9.84456 4.97117C9.84456 5.28817 9.72894 5.56195 9.51215 5.76368L7.73449 7.50719L5.92791 9.02016L9.10748 8.89048H16.5217C17.1865 8.89048 17.649 9.35157 17.649 10.0144Z" fill="#9191A8" />
                    </svg>
                </Link>
                <p className="text-gray-500 font-semibold">
                    {space.title}
                </p>
            </div>
            {/* banner */}
            <div className="relative h-48 md:h-64 w-full">
                <img
                    src={space.bannerImage}
                    alt={space.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* header */}
            <div className="bg-[#423CB9]">
                <hr className="h-[12px] w-full bg-[#7874D2] border-none" />
                <div className="flex flex-col max-w-5xl mx-auto my-6">
                    <h1 className="text-3xl font-bold text-gray-50">
                        {space.title}
                    </h1>
                    <p className="mt-2 text-gray-50">
                        {space.description}
                    </p>
                    <div className="flex-1 mt-2 flex items-center justify-between gap-6 py-4">
                        <div className="flex items-center gap-2 [&>*:not(:last-child)]:after:content-['•'] [&>*:not(:last-child)]:after:mx-2 [&>*:not(:last-child)]:after:text-gray-50">
                            <div className="flex items-center gap-2 text-lg text-gray-50">
                                <img
                                    src={space.author?.imageUrl || '/default-avatar.png'}
                                    alt={space.author?.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex items-center justify-center">
                                    <span className="text-gray-50 text-lg font-medium">{space.author?.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-lg text-gray-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                                <span className="font-medium text-lg">{space.stats?.feedsCount} {space.stats?.feedsCount == 1 ? "Feeds" : "Feeds"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg text-gray-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="font-medium text-lg">{space.stats?.subscribersCount} Subscribers</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-gray-50 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* main */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="bg-white rounded-lg p-4">
                    <div className="flex space-x-4 border-b border-gray-200">
                        <button
                            className={`px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-blue-500`}
                        >
                            Feed
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300`}
                        >
                            People
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300`}
                        >
                            About
                        </button>
                    </div>
                    <div className="mt-8">
                        <FeedsList feeds={feeds} />
                    </div>
                </div>
            </div>
        </div>
    );
}