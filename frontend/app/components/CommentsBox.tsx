import { useCallback, useEffect, useRef, useState } from "react";
import { Space, Comment, User } from "~/types";
import { useFetcher, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import CreateCommentForm from "./CreateCommentForm";
import CommentItem from "./CommentItem";

export default function CommentsBox({ feedId }: { feedId: string }) {
    const { space } = useLoaderData<{ space: Space }>();
    const fetcher = useFetcher<Comment[]>({ key: `comments-${feedId}` });
    const [comments, setComments] = useState<Comment[]>([]);
    const { user } = useRouteLoaderData<{ user: User }>('root');

    useEffect(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.submit(
                {},
                {
                    action: `/spaces/${space.id}/feeds/${feedId}/comments`,
                    method: 'get'
                }
            );
        }
    }, [feedId, space.id, fetcher]);

    useEffect(() => {
        if (fetcher.data) {
            setComments(fetcher.data);
        }
    }, [fetcher.data])

    const updateComments = useCallback(function updateComments(newComment: Comment) {
        function updateNestedComments(comments: Comment[], newComment: Comment): Comment[] {
            return comments.map(comment => {
                if (comment.id === newComment.parentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), newComment]
                    };
                }

                if (comment.replies && comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: updateNestedComments(comment.replies, newComment)
                    };
                }

                return comment;
            });
        }

        setComments(comments => {
            if (!newComment.parentId) {
                // TODO we should use a state management (zustand eg)
                return [...comments, { ...newComment, author: user }];
            }

            return updateNestedComments(comments, { ...newComment, author: user });
        });
    }, [])

    return (
        <div className="px-4 py-2 space-y-4">
            {fetcher.state === 'loading' && (
                <div className="text-gray-500">Loading comments...</div>
            )}

            {comments && (
                <div className="space-y-6">
                    {comments.length === 0 ? (
                        <p className="text-gray-500 italic">No comments yet</p>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} level={1} feedId={feedId} updateComments={updateComments} />
                        ))
                    )}
                </div>
            )}

            <CreateCommentForm feedId={feedId} onChanged={updateComments} />

        </div>
    );
}
