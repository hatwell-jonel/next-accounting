"use server";

import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
    const result = await db.select().from(users);
    return result;
}

export const deleteUser = async (id : number) => {
    await db.delete(users).where(eq(users.id, id ));
    revalidatePath("/");
    return {
        message: "Successfully deleted.",
        success: true,
    };
}