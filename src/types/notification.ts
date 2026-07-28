import z, { array, boolean, object, string } from "zod";
import { projectItemSchemaDetails } from "./project";
import { taskProjectSchema } from "./task";
import { userSchema } from "./user";

export const notificationTypeSchema = z.enum([
    'task_updated',
    'task_status_updated', 
    'task_created',
    'task_deleted',
    'project_updated',
    'project_deleted',
    'member_added',
    'member_removed',
    'note_added',
    'note_deleted'
]);

export const notificationSchema = object({
content: string(),
createdAt: string(),
project: projectItemSchemaDetails.pick({_id:true}).nullable(),
read: boolean(),
task: taskProjectSchema.pick({_id:true}).nullable(),
triggeredBy: userSchema,
type: notificationTypeSchema,
updatedAt: string(),
user: userSchema.pick({'_id':true}),
_id: string()
})

export const notificationsArraySchema = array(notificationSchema);

export type NotificationsArrayType = z.infer<typeof notificationsArraySchema>;
export type Notification = z.infer<typeof notificationSchema>
export type NotificationType = z.infer<typeof notificationTypeSchema>