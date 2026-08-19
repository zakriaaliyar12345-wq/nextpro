"use server";

import type z from "zod";
import { PostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { updateTag } from "next/cache";

export async function createBlogAction(
  values: {
    title: string;
    content: string;
  },
  storageId: string,
) {
  try {
    const parsed = PostSchema.pick({
      title: true,
      content: true,
    }).safeParse(values);

    if (!parsed.success) {
      return {
        error: "Invalid blog data",
      };
    }

    const token = await getToken();

    await fetchMutation(
      api.post.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId as any,
      },
      { token },
    );

    updateTag("blog");

  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return {
      error: "Failed to create post",
    };
  }

  redirect("/blog");
}