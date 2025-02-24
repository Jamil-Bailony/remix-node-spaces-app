import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { requestGetFeeds } from "~/network";

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
