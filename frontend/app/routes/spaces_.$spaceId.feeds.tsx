import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, MetaFunction, redirect, useAsyncValue, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { requestGetFeeds } from "~/network";
import { Feed, Space } from "~/types";

// app/routes/spaces.$spaceId.feeds.tsx (Child route)
export async function loader({ params }: LoaderFunctionArgs) {
    const { spaceId } = params;
    if (!spaceId) {
        throw redirect("/spaces");
    }

    const feeds = await requestGetFeeds(spaceId);
    return { feeds };
}

export default function SpaceFeeds() {
    const { feeds } = useLoaderData<typeof loader>();
    console.log('feeds', feeds);

    return (
        <div className="space-y-4">
            {feeds.map((feed) => (
                <div key={feed.id} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium">{feed.title}</h3>
                    <p className="text-gray-600">{feed.body}</p>
                </div>
            ))}
        </div>
    );
}
