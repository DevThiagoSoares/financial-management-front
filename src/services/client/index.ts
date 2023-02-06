import { useSession, getSession } from "next-auth/react";
import { ICreateCliente, ICreateClientePost } from "../../types/createCliente";
import { ILogin } from "../../types/login";
import { ISignUp } from "../../types/signup";
import { api } from "../api";

// const { data: session } = useSession();

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
}
export async function createLoan(
  token: string,
  id: string,
  payload: any
): Promise<any> {
  return await api.post(
    "/api/loan/" + id,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function CreateAFullPay(token: string, id: string): Promise<any> {
  return await api.put(
    "/api/loan/" + id,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function createPayment(
  token: string,
  paymentId: string,
  payload: any
): Promise<any> {
  return await api.put(
    "/api/loan/instalment/" + paymentId,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
