import z, { array, object, string } from "zod";
import { labelSchema } from "./label";
import { noteSchema } from "./note";
import { userSchema } from "./user";

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);

export const taskSchema = object({
    _id: string(),
    name: string(),
    description: string(),
    status: taskStatusSchema,
    completedBy: array(object({
        _id: string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    labels: array(labelSchema).optional(),
    project: object({
        team: array(object({_id: string()})),
        manager: object({_id: string()})
        }),
    notes: array(noteSchema).optional(),
    createdAt: string(),
    updatedAt: string(),
    deadline: string().optional().nullable(),
    assignedTo: array(userSchema).min(0).optional()
});

export const projectTaskSchema = object({
    _id: string(),
    name: string(),
    description: string(),
    status: taskStatusSchema,
    labels: array(labelSchema).optional(),
    notes: array(noteSchema.pick({_id:true, completed:true, content:true})).optional(),
    createdAt: string(),
    deadline: string().optional().nullable(),
    assignedTo: array(userSchema.pick({_id:true, name:true, avatar:true})).min(0).optional()
})

export const taskProjectSchema = projectTaskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
    notes: true,
    deadline: true,
    createdAt: true,
    labels: true,
    assignedTo: true,
});

export type projectTask = z.infer<typeof projectTaskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type Task = z.infer<typeof taskSchema>;
export type TaskProjectType = z.infer<typeof taskProjectSchema>;
export type TaskFormType = Pick<TaskProjectType, 'name' | 'description' | 'deadline' | 'labels' | 'notes'> ;