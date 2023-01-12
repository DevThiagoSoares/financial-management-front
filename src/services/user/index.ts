import { ILogin } from "../../types/login";
import { ISignUp } from "../../types/signup";
import { api } from "../api";

export async function createUser(data: ISignUp): Promise<any> {
  return await api.post("/api/user", data);
}
export async function login(data: ILogin): Promise<any> {
  return await api.post("/auth/login", data);
}