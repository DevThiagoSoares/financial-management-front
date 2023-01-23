import { ICreateCliente, ICreateClientePost } from "../../types/createCliente";
import { ILogin } from "../../types/login";
import { ISignUp } from "../../types/signup";
import { api } from "../api";

export async function createClient(
  data: ICreateClientePost,
  token: string
): Promise<any> {
  return await api.post("/api/client", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAllClients(token: string): Promise<any> {
  return await api.get("/api/client", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getClient(token: string, id: string): Promise<any> {
  return await api.get("/api/client/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export async function setLoan(token: string, id: string, payload: any): Promise<any> {
    return await api.post("/api/load/" + id, payload,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
