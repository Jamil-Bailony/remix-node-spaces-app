import { Space, User } from "~/types";
import api from "./api";

//#region get spaces
export async function requestGetSpaces(): Promise<Space[]> {
    const { data } = await api.get<Space[]>('/api/spaces');

    return data;
}
//endregion get spaces

//#region get space
export async function requestGetSpace(id: string): Promise<Space> {
    const { data } = await api.get<Space>(`/api/spaces/${id}`);

    return data;
}
//endregion get space