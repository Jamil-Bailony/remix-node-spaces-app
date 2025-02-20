import { Feed, Comment } from "~/types";
import api from "./api";

//#region get spaces
export async function requestGetFeeds(id: string): Promise<Feed[]> {
    const { data } = await api.get<Feed[]>(`/api/spaces/${id}/feeds`);

    return data;
}
//endregion get spaces


//#region get feed comments
export async function requestGetFeedComments(spaceId: string, feedId: string): Promise<Comment[]> {
    const { data } = await api.get<Comment[]>(`/api/spaces/${spaceId}/feeds/${feedId}/comments`);

    return data;
}
//endregion feed comments

//#region post comment
export async function requestPostFeedComment(spaceId: string, feedId: string, authorId: string, body: string): Promise<Comment[]> {
    const { data } = await api.post<Comment[]>(`/api/spaces/${spaceId}/feeds/${feedId}/comments`, {
        authorId,
        body,
    });

    return data;
}
//endregion post comment

//#region post reply
export async function requestPostFeedReply(spaceId: string, feedId: string, authorId: string, body: string, parentId: string): Promise<Comment[]> {
    const { data } = await api.post<Comment[]>(`/api/spaces/${spaceId}/feeds/${feedId}/comments/${parentId}/replies`, {
        authorId,
        body,
        parentId
    });

    return data;
}
//endregion post reply