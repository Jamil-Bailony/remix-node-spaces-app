import { User } from "~/types";
import api from "./api";

//#region get users
type Response = User[]
type Result = User
export default async function requestGetUser(): Promise<Result> {
    const { data } = await api.get<Response>('/api/users'); // mock for now

    return data[0];
}
//endregion get users
