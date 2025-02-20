import { Space, User } from "~/types";
import api from "./api";

//#region get spaces
export default async function requestGetSpaces(): Promise<Space[]> {
    const { data } = await api.get<Space[]>('/api/spaces');

    return data;
}
//endregion get spaces
