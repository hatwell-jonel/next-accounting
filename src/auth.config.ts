import type { NextAuthConfig } from "next-auth"
import Credentials  from "next-auth/providers/credentials"

import { LoginSchema } from "@/lib/types"

import { db } from "./drizzle";
import {users} from "./drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';

const getAuthUser = async (username: string, password : string) => {

    const user = await db.select().from(users).where(eq(users.username, username)).execute();
    
    if (user.length === 0) {
        throw new Error("Username not found");
    }

    const hashedPassword = user[0].password;
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    // Return the user if the password is correct
    return user[0];
}


export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    throw new Error("Invalid input. Please check your username and password.");
                }
                const { username, password } = validatedFields.data;
      
                const user = await getAuthUser(username, password);
                
                // Check if user exists
                if (!user) {
                    throw new Error("User not found.");
                } 

                return JSON.parse(JSON.stringify(user));
            },
        })
    ] 
} satisfies NextAuthConfig


// https://www.youtube.com/watch?v=1MTyCvS05V4&t=12501s