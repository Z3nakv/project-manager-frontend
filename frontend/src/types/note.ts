import z, { boolean, object, string } from "zod";
import { userSchema } from "./user";

export const noteSchema = object({
    _id: string(),
    content: string(),
    createdBy: userSchema,
    task: string(),
    createdAt: string(),
    completed: boolean()
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;