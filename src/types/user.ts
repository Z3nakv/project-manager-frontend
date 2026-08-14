import z, { boolean, object, string, url } from "zod";

export const userSchema = object({
    name: string(),
    email: string(),
    _id: string(),
    avatar: url().optional(),
    isEphemeralDemo: boolean().optional()
})


export type User = z.infer<typeof userSchema>;
