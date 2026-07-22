import z, { array, object, string } from "zod";
import { taskSchema, taskStatusSchema } from "./task";
import { userSchema } from "./user";

export const projectItemSchemaDetails = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    tasks: array(taskSchema),
    manager: userSchema,
    team: array(userSchema),
});

const deadline = string().nullable();
const tasks = array(object({_id:string(), status:taskStatusSchema, deadline: deadline}));

export const projectItemSchemaDetailsArray = z.array(projectItemSchemaDetails)

export const projectItemSchema = projectItemSchemaDetails.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
    team: true
}).extend({tasks});

export const dashboardProjectSchema = z.array(
    projectItemSchemaDetails.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
    team: true,
    }).extend({tasks})
);

export const projectItemSchemaDetailsById = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    tasks: array(taskSchema),
    manager: userSchema,
    team: array(userSchema)
});

export const projectsItemSchema = array(projectItemSchema);

export type ProjectItemType = z.infer<typeof projectItemSchema>;
export type ProjectFormDataType = Pick<ProjectItemType, 'projectName' | 'clientName' | 'description'>;
export type projectItemDetailsArrayType = z.infer<typeof projectItemSchemaDetailsArray>;
export type ProjectItemSchemaDetailsType = z.infer<typeof projectItemSchemaDetails>;
export type ProjectFormType = z.infer<typeof projectItemSchemaDetails>;

