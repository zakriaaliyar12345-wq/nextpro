import z from "zod";
import { Id } from '../../convex/_generated/dataModel';


export const commentSchema = z.object({
    body: z.string().min(3),
    postId:z.custom<Id<"posts">>()
 }) 