import z, { array, object, string } from "zod";
import { projectTaskSchema, taskSchema, taskStatusSchema } from "./task";
import { userSchema } from "./user";


export const projectSchema = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    manager: userSchema.pick({_id:true, name:true, avatar:true}),
    team: array(userSchema.pick({_id:true, name:true, avatar:true})),
    tasks: array(projectTaskSchema)
});

export const dashboardProjectSchema = projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
    team: true,
}).extend({
    tasks: array(
      projectTaskSchema.pick({
        _id:true,
        status: true,
        deadline: true,
      })
    ),
  });

export const dashboardProjectsArraySchema = array(dashboardProjectSchema);

/* REFACTORIZACION DE SCHEMAS Y TIPOS */

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

export const projectItemSchemaDetailsById = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    tasks: array(projectTaskSchema),
    manager: userSchema,
    team: array(userSchema)
});

export const editProjectSchema = object({
    projectName: string(),
    clientName: string(),
    description: string(),
    team: array(userSchema.pick({_id:true}))
})

export const projectsItemSchema = array(projectItemSchema);

export type EditProject = Omit<
  Pick<ProjectItemType, "projectName" | "clientName" | "description" | "team">,
  "team"
> & {
  team: {_id:string}[];
};

export type EditProjectFormProps = {
  project: EditProject;
};

export type ProjectItemType = z.infer<typeof dashboardProjectSchema>;
export type ProjectFormDataType = Pick<ProjectItemType, 'projectName' | 'clientName' | 'description'>;
export type projectItemDetailsArrayType = z.infer<typeof projectItemSchemaDetailsArray>;
export type ProjectItemSchemaDetailsType = z.infer<typeof projectItemSchemaDetails>;
export type ProjectFormType = z.infer<typeof projectItemSchemaDetails>;

