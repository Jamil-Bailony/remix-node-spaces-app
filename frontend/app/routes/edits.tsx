import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Edits" },
    ];
};

export default function Edits() {
    return (
        <div className="flex flex-col h-screen">
            <div className="m-4 p-4 flex flex-col grow">
                <h1 className="text-5xl font-semibold my-5">Edits</h1>
                <hr className="my-1" />
                <div className="flex justify-center items-center grow">
                    <div className="text-center">
                        <p className="text-4xl">No feeds to edits</p>
                        <p className="text-2xl">No feeds to edits</p>
                    </div>
                </div>
            </div>
        </div>
    )
}