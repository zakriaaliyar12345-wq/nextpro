"use server";

import type z from "zod";
import { PostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export async function createBlogAction(values: z.infer<typeof PostSchema>) {
  try {
    const parsed = PostSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error("Something went wrong");
    }

    const token = await getToken();

    const imagetUrl = await fetchMutation(
      api.post.generateImageUploadUrl,
      {},
      { token },
    );
    const uploadResualt = await fetch(imagetUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });
    if (!uploadResualt.ok) {
      return {
        error: "Failed image upload ",
      };
    }

    const { storageId } = await uploadResualt.json();

    await fetchMutation(
      api.post.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      { token },
      );
      
  } catch {
    return {
      error: "Failed to create post  ",
    };
    }
    revalidatePath('/blog');

  redirect("/blog");
}
