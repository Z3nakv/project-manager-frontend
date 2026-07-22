import z, { array } from "zod";
import { userSchema } from "./user";

export const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
});

export const TeamMembersSchema = array(teamMemberSchema)

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>
export type TeamMemberId = Pick<TeamMember, '_id'>