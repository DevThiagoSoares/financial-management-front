
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string,
    user: {
      isAdm: boolean,
      id: string,
      
      
    }& DefaultSession["user"]
    expires: string,
  }
  interface events {
    signIn(message: string): Promise<void>
    signOut(message: string): Promise<void>
    createUser(message: string): Promise<void>
    linkAccount(message: string): Promise<void>
    session(message: string): Promise<void>
    error(message: string): Promise<void>
  }
}