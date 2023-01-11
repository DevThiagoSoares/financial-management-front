
import { api } from "../api";

export async function createVisitor() {
  return await api.post("api/registration");
}

export function findById(rg: string) {
  return api.get("api/registration/" + rg);
}

export async function findManyVisitors() {
  console.log("req");
  return await api.get("api/client");
}
