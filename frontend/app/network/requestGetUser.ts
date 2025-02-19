import { User } from "~/types";
import api from "./api";

type Response = User[]
type Result = User
export default async function requestGetUser(): Promise<Result> {
    const { data } = await api.get<Response>('/api/users');

    return data[0];
}