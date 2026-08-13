import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";



export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId:v.id("_storage")
    
   },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Not authenticate !");
        }
      const blogArticle = await ctx.db.insert("posts", {
          body: args.body,
          title: args.title,
        authorId: user._id,
          imageStorageId:args.imageStorageId,
      });
        return blogArticle;
    
  },
});
export const getPosts = query({
  args: {},
  handler: async(ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect()
    return posts;

  }

})
export const generateImageUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Not authenticate user ")
        }
        return await ctx.storage.generateUploadUrl();
    }
});