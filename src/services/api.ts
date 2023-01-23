import axios from "axios";
import { server_url } from "./serverUrl";

export const api = axios.create({
  baseURL: server_url,
});
