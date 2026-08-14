import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
export const getCommentsByPost = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("Comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc").collect;

    return data;
  },
});


export const createComments = mutation({
    args: {
        postId: v.id("posts"),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Not authenticate ");
        }



        return await ctx.db.insert("Comments", {
            postId: args.postId,
            body: args.body,
            authorId: user._id,
            authorName:user.name  
        })
    }
})