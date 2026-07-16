import z, { array, boolean, email, object, string } from "zod";
import { LABEL_COLORS } from "../constants/labelColorClasses";

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);

//Auth users

const authSchema = object({
    name: string(),
    email: email(),
    current_password: string(),
    password: string(),
    password_confirmation: string(),
    token: string()
});

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: string()
});

/* notes */

export const noteSchema = object({
    _id: string(),
    content: string(),
    createdBy: userSchema,
    task: string(),
    createdAt: string()
})

export const labelSchema = object({
  text: string(),
  color: z.enum(LABEL_COLORS),
});

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
    notes: array(noteSchema),
    createdAt: string(),
    updatedAt: string(),
    deadline: string().optional().nullable()
});

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
    notes: true,
    deadline: true,
    createdAt: true,
    labels: true
})

export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
});

export const projectItemSchemaDetails = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    tasks: array(taskSchema),
    manager: userSchema.pick({_id: true}),
    team: array(userSchema.pick({_id: true})),
});

export const projectItemSchemaDetailsByID = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    tasks: array(taskSchema),
    manager: userSchema.pick({_id: true}),
    team: array(userSchema.pick({_id: true}))
});

export const projectItemSchemaDetailsArray = z.array(projectItemSchemaDetails)

export const projectItemSchema = projectItemSchemaDetails.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
    team: true
});

export const dashboardProjectSchema = z.array(
    projectItemSchemaDetails.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
    team: true
    })
);

const notificationTypeSchema = z.enum([
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

export const TeamMembersSchema = array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>
export type TeamMemberID = Pick<TeamMember, '_id'>

export const projectsItemSchema = array(projectItemSchema);

export type ProjectFormType = z.infer<typeof projectItemSchemaDetails>

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type ConfirmToken = Pick<Auth, 'token'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type checkPasswordForm = Pick<Auth, 'password'>;
export type UpdateCurrentPasswordForm = Pick<Auth,'current_password' | 'password' | 'password_confirmation'>;


export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

export type Task = z.infer<typeof taskSchema>
export type TaskStatus = z.infer<typeof taskStatusSchema>
export type TaskProjectType = z.infer<typeof taskProjectSchema>
export type TaskFormType = Pick<TaskProjectType, 'name' | 'description' | 'deadline' | 'labels'> ;
export type ProjectItemSchemaDetailsType = z.infer<typeof projectItemSchemaDetails>
export type ProjectItemType = z.infer<typeof projectItemSchema>
export type ProjectFormDataType = Pick<ProjectItemType, 'projectName' | 'clientName' | 'description'>
export type projectItemDetailsArrayType = z.infer<typeof projectItemSchemaDetailsArray>
export type projectItemDetailsType = z.infer<typeof projectItemSchemaDetails>


export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;

export type Notification = z.infer<typeof notificationSchema>
export type NotificationType = z.infer<typeof notificationTypeSchema>
export type Label = z.infer<typeof labelSchema>;