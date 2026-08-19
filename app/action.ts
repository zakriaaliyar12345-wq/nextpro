"use server";

import type z from "zod";
import { PostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { updateTag } from "next/cache";

export async function createBlogAction(
  values: z.infer<typeof PostSchema>,
) {
  const parsed = PostSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid form data",
    };
  }

  try {
    const token = await getToken();

    if (!token) {
      return {
        error: "You must be logged in",
      };
    }

    // 1. Get Convex upload URL
    const imageUrl = await fetchMutation(
      api.post.generateImageUploadUrl,
      {},
      { token },
    );

    // 2. Upload image
    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image",
      };
    }

    const { storageId } = await uploadResult.json();

    // 3. Create post
    await fetchMutation(
      api.post.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: storageId,
      },
      { token },
    );

    // 4. Tell Next.js that the blog cache is stale
    updateTag("blog");
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return {
      error: "Failed to create post",
    };
  }

  // IMPORTANT: keep redirect OUTSIDE the try/catch
  redirect("/blog");
}