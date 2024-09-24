import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import authConfig from "@/auth.config"
import { db } from "./drizzle"
 
export const { 
  auth, 
  handlers, 
  signIn, 
  signOut 
} = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  adapter: DrizzleAdapter(db),
})