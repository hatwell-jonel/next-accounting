'use server';

import { signIn } from "@/auth";
import {LoginSchema} from "@/lib/types";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod"
import { isRedirectError } from "next/dist/client/components/redirect";

export const credentialLogin = async (values : z.infer<typeof LoginSchema>): Promise<string | void>  => {
    const validatedForm = LoginSchema.safeParse(values)

    if(!validatedForm.success){
        return validatedForm.error.toString();
    }

    const {username , password} = validatedForm.data;

    try {
        await signIn('credentials', {
            username,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        console.error(error);
        if (isRedirectError(error)) throw error;
        if (error instanceof AuthError) return error.cause?.err?.message;
        return "Something went wrong.";
    }
}