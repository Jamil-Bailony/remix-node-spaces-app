import { useEffect, useRef } from "react";
import { Space, Comment, User } from "~/types";
import { useFetcher, useLoaderData, useRouteLoaderData } from "@remix-run/react";

export default function CreateCommentForm({ feedId, commentId, onChanged }: { feedId: string, commentId?: string, onChanged: (comment: Comment) => void }) {
    const fetcher = useFetcher<Comment[]>();
    const { space } = useLoaderData<{ space: Space }>();
    const data = useRouteLoaderData<{ user: User }>('root');
    const form = useRef();

    // TODO check why getting error when adding 4th level comment
    useEffect(() => {
        if (fetcher.state === 'idle' && fetcher.data) {
            onChanged(fetcher.data);
            if (form) {
                form.current.reset();
            }
        }
    }, [fetcher.state, fetcher.data, onChanged]);

    return (
        <fetcher.Form
            action={`/spaces/${space.id}/feeds/${feedId}/comments`}
            method="post"
            className="mt-4"
            ref={form}
        >
            <input type="hidden" name="userId" value={data?.user.id} />
            {commentId && <input type="hidden" name="parentId" value={commentId} />}
            <textarea
                name="body"
                placeholder="Write a comment..."
                autoFocus
                required
                className="w-full min-h-[100px] p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                disabled={fetcher.state === 'loading'}
            />
            <button
                type="submit"
                disabled={fetcher.state === 'loading'}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                {commentId ? 'Add Reply' : 'Add Comment'}
            </button>
        </fetcher.Form>
    )
}
