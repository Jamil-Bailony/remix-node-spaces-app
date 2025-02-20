import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Page not found" },
    ];
};

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-8xl font-bold">404</h1>
            <p className="text-xl">Page not found</p>
            <a href="/" className="text-blue-500">Go back home</a>
        </div>
    )
}