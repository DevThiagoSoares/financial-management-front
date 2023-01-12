import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { ILogin } from "../../../types/login";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "APP",
      credentials: {
        login: { label: "login", type: "email",   },
        password: { label: "password", type: "password" },
      },
      authorize: async (req:any): Promise<any> => {
        const payload = {
          login: req.login,
          password: req.password,
        };

        const res = await axios.post(
          `${process.env.SERVER_URL}/auth/login`,
          { login: payload.login, password: payload.password },
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
        accessToken: token?.access_token as string,
        user: { 
          name : token?.name as string,
          image : token?.image as string,
          email: token?.email as string,
          isAdm : token?.isAdm as boolean,
          id : token?.id as string,
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
          access_token : user?.access_token,
          // @ts-ignore
          name : user?.name as string,
          // @ts-ignore
          email: user?.login as string,
          // @ts-ignore
          isAdm : user?.isAdm as boolean,
          // @ts-ignore
          image : user?.id as string,
          // @ts-ignore
          id : user?.id as string,
          
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
