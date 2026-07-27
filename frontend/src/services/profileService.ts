import { isAxiosError } from "axios";
import type { UserProfileForm } from "../types/profile";
import type { UpdateCurrentPasswordForm } from "../types/auth";
import { httpPost, httpPut } from "../lib/http";

type MessageResponse = { message: string };

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const url = `/auth/profile`;
    const data = await httpPut<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, {cause:error});
    }
    throw error;
  }
};

export const changePassword = async (formData: UpdateCurrentPasswordForm) => {
  try {
    const url = `/auth/update-password`;
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
    throw error;
  }
};
