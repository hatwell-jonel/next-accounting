'use server';

import { signIn } from "@/auth";
import {LoginSchema} from "@/lib/types";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod"

import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";

export const credentialLogin = async (values : z.infer<typeof LoginSchema>) => {
    const validatedForm = LoginSchema.safeParse(values)

    if(!validatedForm.success){
        return {error: validatedForm.error}
    }

    const {username , password} = validatedForm.data;

    try {
        await signIn('credentials', {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return error;
        }
        throw error;return 
    }
}

export const getUser = async () => {
    const user = await db.select().from(users).execute();
    if (user.length === 0) {
        throw new Error("User not found");
    }

    console.log(user[0])
    return user[0];
}