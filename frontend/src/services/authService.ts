import { httpGet, httpPost } from "../lib/http";
import type { checkPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types/auth";
import { userSchema, type User } from "../types/user";

export const createAccount = async (formData: UserRegistrationForm) => {
  const url = "/auth/create-account";
  return httpPost<string>(url, formData);
};

export const confirmAccount = async (formData: ConfirmToken) => {
  const url = "/auth/confirm-account";
  return httpPost<string>(url, formData);
};

export const requestConfirmationCode = async (formData: RequestConfirmationCodeForm) => {
  const url = "/auth/request-code";
  return httpPost<string>(url, formData);
};

export const authenticateUser = async (formData: UserLoginForm) => {
  const url = "/auth/login";
  const data = await httpPost<string>(url, formData);
  localStorage.setItem("AUTH_TOKEN_JWT", data);
  return data;
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  const url = "/auth/forgot-password";
  return httpPost<string>(url, formData);
};

export const validateToken = async (formData: ConfirmToken) => {
  const url = "/auth/validate-token";
  return httpPost<string>(url, formData);
};

export const updatePasswordWithToken = async ({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) => {
  const url = `/auth/update-password/${token}`;
  return httpPost<string>(url, formData);
};

export const getUser = async () => {
  const data = await httpGet<unknown>("/auth/user");
  const response = userSchema.safeParse(data);
  if (response.success) return response.data;

  throw new Error("Los datos del usuario no tienen el formato esperado.");
};

export const checkPassword = async (formData: checkPasswordForm) => {
  const url = "/auth/check-password";
  return httpPost<string>(url, formData);
};

type GoogleAuthResponse = {
  user: User;
  token: string;
};

export const googleAuth = async (googleToken: string) => {
  const url = "/auth/google";
  return httpPost<GoogleAuthResponse>(url, {
    token: googleToken,
  });
};