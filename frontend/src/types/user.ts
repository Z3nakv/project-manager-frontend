import z, { object, string, url } from "zod";

export const userSchema = object({
    name: string(),
    email: string(),
    _id: string(),
    avatar: url().optional()
})


export type User = z.infer<typeof userSchema>;
