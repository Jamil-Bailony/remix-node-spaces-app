import { Link, useLocation } from "@remix-run/react";
import TimeIcon from "~/icons/time";
import CalendarIcon from "~/icons/calendar";
import CardsIcon from "~/icons/cards";
import GroupIcon from "~/icons/group";
import PeopleIcon from "~/icons/people";
import { User } from "~/types";

type AuthenticatedLayoutProps = {
    children: React.ReactNode;
    user: User
};

export default function AuthenticatedLayout({ children, user }: AuthenticatedLayoutProps) {
    return (
        <div className="flex flex-col h-screen max-h-screen w-screen md:flex-row overflow-hidden">
            <main className="flex-1 overflow-y-auto order-1 md:order-2">
                {children}
            </main>

            <aside className="flex-none h-20 md:h-full md:w-64 bg-gray-100 border-t md:border-t-0 md:border-r order-2 md:order-1">
                {/* mobile */}
                <div className="md:hidden w-full h-full">
                    <div className="flex items-center justify-around h-full">
                        <SidebarItems />
                    </div>
                </div>

                {/* desktop */}
                <div className="hidden md:block h-full">
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex items-center h-16 my-5 mx-4 gap-2">
                            {user.imageUrl ? (
                                <img src={user.imageUrl} alt={user.username} className="w-10 h-10 rounded-full" />
                            ) : (
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
                                    <span className="text-xl font-bold">{user.username?.charAt(0)}</span>
                                </div>
                            )}
                            <div className="text-xl font-bold">{user.username}</div>
                        </div>
                        <div className="flex items-center justify-center w-full h-10">
                            <div className="relative w-11/12">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className="w-full h-10 rounded-lg bg-gray-200 p-2 pl-10"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <SidebarItems />
                    </div>
                </div>
            </aside>
        </div>
    )
}

function SidebarItems() {
    const { pathname } = useLocation();

    const sidebarItems = [
        {
            id: "home",
            name: "Home",
            icon: <GroupIcon />,
            link: "",
            active: pathname === "/" || pathname === ""
        },
        {
            id: "spaces",
            name: "Spaces",
            icon: <PeopleIcon />,
            link: "spaces",
            active: pathname.startsWith("/spaces")
        },
        {
            id: "feeds",
            name: "Latest Feeds",
            icon: <CardsIcon />,
            link: "feeds",
            active: pathname.startsWith("/feeds")
        },
        {
            id: "events",
            name: "Events",
            icon: <CalendarIcon />,
            link: "events",
            active: pathname.startsWith("/events")
        },
        {
            id: "edits",
            name: "Edit Later",
            icon: <TimeIcon />,
            link: "edits",
            active: pathname.startsWith("/edit")
        }
    ]

    return (
        <div className={`flex flex-col lg:mx-2 max-md:flex-row max-md:items-center max-md:w-full max-md:h-full md:mt-6`}>
            {sidebarItems.map(item => (
                <Link
                    to={item.link}
                    className={`flex lg:rounded-lg items-center justify-start gap-2 px-4 w-full h-10 p-2 md:py-5 transition-colors duration-200 ease-in-out max-md:h-full max-md:justify-center max-md:flex-1 ${item.active ? "bg-[#E8ECFF] text-[#3668FF] max-md:border-t-4 border-[#3668FF] md:border-none" : "text-gray-700"
                        }`}
                    key={item.name}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-lg font-bold hidden md:block">{item.name}</span>
                </Link>
            ))}
        </div>
    )
}