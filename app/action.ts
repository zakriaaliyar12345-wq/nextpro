"use server";

import type z from "zod";
import { PostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(values: z.infer<typeof PostSchema>) {
    const parsed = PostSchema.safeParse(values);
    if (!parsed.success) {
        throw new Error("Something went wrong");
    }

    const token = await getToken();

    await fetchMutation(api.post.createPost, {
        body: parsed.data.content,
        title: parsed.data.title
    }, { token });

    redirect("/");
}