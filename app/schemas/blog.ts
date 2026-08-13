import z from "zod";
export const PostSchema = z.object({
    title: z.string().min(3).max(60),
    content: z.string().min(15),
    image:z.instanceof(File)
})