import { Link, MetaFunction, useRouteLoaderData } from "@remix-run/react";
import { requestGetSpaces } from "~/network/spaces";
import { Space } from "~/types";

export const meta: MetaFunction = () => {
    return [
        { title: "Spaces" },
    ];
};

export async function loader() {
    const spaces: Space[] = await requestGetSpaces();
    return { spaces };
}

export default function Spaces() {
    const data = useRouteLoaderData<typeof loader>('routes/spaces');
    const spaces = data?.spaces;

    return (
        <div className="flex flex-col h-screen">
            <div className="m-4 p-4 flex flex-col grow">
                <h1 className="text-5xl font-semibold my-5">Spaces</h1>
                <hr className="my-1" />
                <div className="flex flex-col">
                    <SpaceList spaces={spaces} />
                </div>
            </div>
        </div>

    )
}

function SpaceList({ spaces }: { spaces: Space[] | undefined }) {
    if (!spaces || spaces?.length == 0) {
        return <div className="text-center">
            <p className="text-4xl">No Spaces</p>
            <p className="text-2xl">No spaces found</p>
        </div>
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {spaces?.map((space: Space) => (
                <SpaceCard space={space} key={space.id} />
            ))}
        </div>
    )
}

function SpaceCard({ space }: { space: Space }) {
    return (
        <Link
            to={`/spaces/${space.id}`}
            key={space.id}
            className="group bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
            <div className="aspect-video w-full relative overflow-hidden">
                <img
                    src={space.bannerImage}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {space.title}
                    </h3>
                </div>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {space.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1" title="Feeds">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                        {space.stats?.feedsCount || 0}
                    </span>
                    <span className="flex items-center gap-1" title="Subscribers">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        {space.stats?.subscribersCount || 0}
                    </span>
                </div>
            </div>
        </Link>
    )
}
