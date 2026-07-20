import z, { array, object, string } from "zod";
import { taskSchema } from "./task";
import { userSchema } from "./user";

export const projectItemSchemaDetails = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    tasks: array(taskSchema),
    manager: userSchema.pick({_id: true}),
    team: array(userSchema),
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

export const projectItemSchemaDetailsByID = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    tasks: array(taskSchema),
    manager: userSchema.pick({_id: true}),
    team: array(userSchema)
});

export const projectsItemSchema = array(projectItemSchema);

export type ProjectItemType = z.infer<typeof projectItemSchema>;
export type ProjectFormDataType = Pick<ProjectItemType, 'projectName' | 'clientName' | 'description'>;
export type projectItemDetailsArrayType = z.infer<typeof projectItemSchemaDetailsArray>;
export type ProjectItemSchemaDetailsType = z.infer<typeof projectItemSchemaDetails>;
export type ProjectFormType = z.infer<typeof projectItemSchemaDetails>;

