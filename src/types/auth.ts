import z, { email, object, string } from "zod";

export const authSchema = object({
    name: string(),
    email: email(),
    current_password: string(),
    password: string(),
    password_confirmation: string(),
    token: string()
});


export type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type ConfirmToken = Pick<Auth, 'token'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type checkPasswordForm = Pick<Auth, 'password'>;
export type UpdateCurrentPasswordForm = Pick<Auth,'current_password' | 'password' | 'password_confirmation'>;