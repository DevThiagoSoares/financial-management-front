import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  login: string;
  id: string;
  name: string;
  isAdm: boolean;
  access_token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { login, password } = req.body as {
        login: string;
        password: string;
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/auth/login`,
        { login, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json(response.data as Data);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" } as any);
    }
  }
}
