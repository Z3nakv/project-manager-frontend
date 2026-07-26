import { get, getApiErrorMessage, post, throwApiError } from "../lib/axios";
import type { checkPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types/auth";
import { userSchema, type User } from "../types/user";

export const createAccount = async (formData: UserRegistrationForm) => {
  const url = "/auth/create-account";
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const confirmAccount = async (formData: ConfirmToken) => {
  const url = "/auth/confirm-account";
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const requestConfirmationCode = async (formData: RequestConfirmationCodeForm) => {
  const url = "/auth/request-code";
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const authenticateUser = async (formData: UserLoginForm) => {
  const url = "/auth/login";
  try {
    const token = await post<string>(url, formData);
    localStorage.setItem("AUTH_TOKEN_JWT", token);
    return token;
  } catch (error) {
    throwApiError(error);
  }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  const url = "/auth/forgot-password";
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const validateToken = async (formData: ConfirmToken) => {
  const url = "/auth/validate-token";
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const updatePasswordWithToken = async ({ formData, token }: { formData: NewPasswordForm; token: ConfirmToken["token"] }) => {
  const url = `/auth/update-password/${token}`;
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const getUser = async () => {
  try {
    const data = await get<unknown>("/auth/user");
    const response = userSchema.safeParse(data);
    if (response.success) return response.data;
    throw new Error("Datos de usuario no válidos");
  } catch (error) {
    if (error instanceof Error && error.message === "Datos de usuario no válidos") {
      throw error;
    }
    throwApiError(error);
  }
};

export const checkPassword = async (formData: checkPasswordForm) => {
  const url = "/auth/check-password";
  try {
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

type GoogleAuthResponse = {
  user: User;
  token: string;
};

export const googleAuth = async (googleToken: string) => {
  const url = "/auth/google";
  try {
    return await post<GoogleAuthResponse>(url, { token: googleToken });
  } catch (error) {
    throw new Error(getApiErrorMessage(error), { cause: error });
  }
};