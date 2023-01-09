import { ILogin } from "../../types/login";
import { ISignUp } from "../../types/signup";
import { api } from "../api";

export async function createUser(data: ISignUp): Promise<any> {
  return await api.post("/users", data);
}
export async function login(data: ILogin): Promise<any> {
  return await api.post("/login", data);
}