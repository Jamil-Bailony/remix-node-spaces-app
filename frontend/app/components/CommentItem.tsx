import { useState } from "react";
import AuthorCard from "./AuthorCard";
import { Comment } from "~/types";
import CreateCommentForm from "./CreateCommentForm";

interface CommentItemProps {
    comment: Comment, parentAuthorName?: string, feedId: string, updateComments: (comment: Comment) => void
}

export default function CommentItem({ feedId, comment, parentAuthorName, updateComments }: CommentItemProps) {
    const marginLeft = `${(comment.level - 1) * 32}px`;
    const [showReplyForm, setShowReplyForm] = useState(false);

    return (
        <>
            <div
                className="relative"
                style={{ marginLeft }}
            >
                <div className={`
                    pl-4 
                    border-l-2 
                    ${comment.level === 1 ? 'border-blue-400' : 'border-gray-200'}
                `}>
                    <div className="flex-1 min-w-0 ">
                        <div className="flex items-center gap-2 text-sm mb-4">
                            <AuthorCard imageUrl={comment.author?.imageUrl} name={comment.author?.name} className="inline-flex" />
                            {parentAuthorName && (
                                <>
                                    <span className="text-gray-500">replied to</span>
                                    <span className="font-medium text-gray-900">
                                        {parentAuthorName}
                                    </span>
                                </>
                            )}
                            <span className="text-gray-500">•</span>
                            <time className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </time>
                        </div>

                        <div className="mt-1">
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {comment.body}
                            </p>
                        </div>

                        {comment.level < 4 && <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                            <button className="hover:text-blue-600 transition-colors" onClick={() => setShowReplyForm(!showReplyForm)}>
                                Reply
                            </button>
                        </div>}
                    </div>
                </div>
            </div>

            {comment.replies && comment.level < 4 && (
                <div className="space-y-6">
                    {comment.replies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            parentAuthorName={comment.author?.name}
                            feedId={feedId}
                            updateComments={updateComments}
                        />
                    ))}
                </div>
            )}

            {/* TODO scroll to the comment box smoothly */}
            {showReplyForm && comment.level < 4 && (
                <div
                    className="relative"
                    style={{ marginLeft }}
                >
                    <CreateCommentForm feedId={feedId} commentId={comment.id} onChanged={updateComments} />
                </div>
            )}
        </>
    );
}
