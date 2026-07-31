import type {
  checkPasswordForm,
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserLoginForm,
  UserRegistrationForm,
} from "../types/auth";
import { userSchema, type User } from "../types/user";
import { httpGet, httpPost } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";
import { setAccessToken } from "../utils/auth";

type MessageResponse = { message: string };

export const createAccount = async (formData: UserRegistrationForm) => {
  const url = "/auth/create-account";
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

export const confirmAccount = async (formData: ConfirmToken) => {
  const url = "/auth/confirm-account";
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

export const requestConfirmationCode = async (
  formData: RequestConfirmationCodeForm,
) => {
  const url = "/auth/request-code";
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

type LoginResponse = {
  accessToken: string;
};

export const authenticateUser = async (formData: UserLoginForm) => {
  const url = "/auth/login";
  const data = await httpPost<LoginResponse>(url, formData);
  setAccessToken(data.accessToken);
  return data;
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  const url = "/auth/forgot-password";
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

export const validateToken = async (formData: ConfirmToken) => {
  const url = "/auth/validate-token";
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

export const updatePasswordWithToken = async ({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) => {
  const url = `/auth/update-password/${token}`;
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

export const getUser = async () => {
  const url = "/auth/user";
  const data = await httpGet(url);
  return parseOrThrow(userSchema, data, "getUser");
};

export const logoutUser = async () => {
  const url = "/auth/logout";
  return httpPost(url, {});
};

export const checkPassword = async (formData: checkPasswordForm) => {
  const url = "/auth/check-password";
  const data = await httpPost<MessageResponse>(url, formData);
  return data.message;
};

type GoogleAuthResponse = {
  user: User;
  accessToken: string;
};

export const googleAuth = async (googleToken: string) => {
  const url = "/auth/google";
  const data = await httpPost<GoogleAuthResponse>(url, {
    token: googleToken,
  });
  return data;
};

export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  const url = "/auth/refresh-token";
  return httpPost(url, {});
};
