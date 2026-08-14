import { defineSchema, defineTable} from "convex/server";
import { v, ConvexError } from 'convex/values';
import { mutation} from './_generated/server';
import { authComponent } from './auth';

export default defineSchema({
    posts: defineTable({
        title: v.string(),
        body: v.string(),
        authorId: v.string(),
        imageStorageId:v.optional(v.id("_storage")),
        
    }),
    Comments: defineTable({
        
    })
})


