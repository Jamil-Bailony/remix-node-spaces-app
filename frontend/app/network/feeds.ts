import { Feed, Space, User } from "~/types";
import api from "./api";

//#region get spaces
export async function requestGetFeeds(id: string): Promise<Feed[]> {
    const { data } = await api.get<Feed[]>(`/api/spaces/${id}/feeds`);

    return data;
}
//endregion get spaces