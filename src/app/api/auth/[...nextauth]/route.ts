import NextAuth from "next-auth/next";
import {authOpations} from "./options"

const handler = NextAuth(authOpations)

export {
  handler as GET ,handler as POST
}