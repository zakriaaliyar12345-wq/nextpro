import z from "zod"
export const signUpSchema = z.object({
    name: z.string().min(8).max(30),
    email: z.email(),
    password: z.string().min(8).max(30)

});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(30)
});
