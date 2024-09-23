import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"

import { LoginSchema } from "@/lib/types"
 
export default {
     providers: [
        credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
               const validatedFields = LoginSchema.safeParse(credentials);
          
               if (validatedFields.success) {
                  const { username, password } = validatedFields.data;
                  if(username != "" && password != "") {
                      return {
                          id: "1",
                          name: "Jonel",
                          email: "jonel@gmail.com",
                          role: "admin",
                      };
                  }  
              }

               return null;
            },
        })
     ] 
} satisfies NextAuthConfig