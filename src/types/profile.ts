import type { User } from "./user";

export type UserProfileForm = Pick<User, 'name' | 'email'>;