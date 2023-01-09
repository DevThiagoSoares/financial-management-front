import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { ILogin } from "../../../types/login";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "APP",
      credentials: {
        email: { label: "email", type: "email",   },
        password: { label: "password", type: "password" },
      },
      authorize: async (req:any): Promise<any> => {
        const payload = {
          email: req.email,
          password: req.password,
        };

        const res = await axios.post(
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          { email: payload.email, password: payload.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.data;
        if (data.error) {
          throw new Error("default");
        }
        const user = data;
        return user as any;
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token }) {
      let sessionObj = {
        accessToken: token?.accessToken as string,
        user: { 
          name : token?.name as string,
          image : token?.image as string,
          email: token?.email as string,
        },
        expires: "24h"
      }
      console.log("sessionObj", sessionObj)
      
      return sessionObj;
    },
    async jwt({ token, user }) { 
      if (user) {
        token = {
          // @ts-ignore
          accessToken : user?.accessToken,
          // @ts-ignore
          name : user?.nome as string,
          // @ts-ignore
          email: user?.email as string,
          // @ts-ignore
          cpf : user?.cpf,
          // @ts-ignore
          image : user?.id as string,
          // @ts-ignore
          id : user?.id,
          // @ts-ignore
          paf : user?.paf,
          // @ts-ignore
          atendente : user?.atendente,
          // @ts-ignore
          empresa : user?.empresa as string[],
          // @ts-ignore
          role : user?.role as string,

        }
      }
      return token;
    },
  },
  pages: {
    error: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 days
    // maxAge: 1 * 60, // 1 minutes
    updateAge: 1 * 60 * 60, // 1 hours
    // updateAge: 1* 60, // 1 minutes
  },
  jwt: {
    secret: process.env.SECRET,
    maxAge: 1 * 24 * 60 * 60, // 1 days
    // maxAge: 1 * 60, // 1 minutes
  },
  events: {
    async signIn(message) {
      //console.log(message);
    },
    async signOut(message) {
      //console.log(message);
    },
    async createUser(message) {
      //console.log(message);
    },
    async linkAccount(message) {
      //console.log(message);
    },
    async session(message) {
      //console.log(message);
    },
  },
  // log
  debug: true,

});
