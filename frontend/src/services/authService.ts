import { isAxiosError } from "axios";
import type { checkPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types/auth";
import { userSchema, type User } from "../types/user";
import { httpGet, httpPost } from "../lib/http";
import { parseOrThrow } from "../lib/parseOrThrow";

type MessageResponse = { message: string };

export const createAccount = async (formData: UserRegistrationForm) => {
  const url = "/auth/create-account";
  try {
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const confirmAccount = async (formData: ConfirmToken) => {
  const url = "/auth/confirm-account";
  try {
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const requestConfirmationCode = async (
  formData: RequestConfirmationCodeForm,
) => {
  const url = "/auth/request-code";
  try {
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, {cause: error});
    }
    throw error;
  }
};

export const authenticateUser = async (formData: UserLoginForm) => {
  const url = "/auth/login";
  try {
    const data = await httpPost<string>(url, formData);
    localStorage.setItem("AUTH_TOKEN_JWT", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, {cause:error});
    }
    throw error;
  }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  const url = "/auth/forgot-password";
  try {
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, {cause:error});
    }
    throw error;
  }
};

export const validateToken = async (formData: ConfirmToken) => {
  const url = "/auth/validate-token";
  try {
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const updatePasswordWithToken = async ({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) => {
  const url = `/auth/update-password/${token}`;
  try {
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

export const getUser = async () => {
  const url ="/auth/user"
    const data = await httpGet(url);
    parseOrThrow(userSchema, data, "getUser");
};

export const checkPassword = async (formData : checkPasswordForm) => {
  const url = '/auth/check-password';
  try {
        const data = await httpPost<MessageResponse>(url, formData);
        return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw error;
  }
};

type GoogleAuthResponse = {
    user: User
    token: string
}

export const googleAuth = async (googleToken: string) => {
  const url = '/auth/google';
  try {
    const data = await httpPost<GoogleAuthResponse>(url, {
      token: googleToken
    });
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, { cause: error });
    }
    throw new Error('Error al autenticar con Google', {cause:error})
  }
}