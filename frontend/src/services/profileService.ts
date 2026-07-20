import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import type { UserProfileForm } from "../types/profile";
import type { UpdateCurrentPasswordForm } from "../types/auth";

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const url = `/auth/profile`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error, {cause:error});
    }
  }
};

export const changePassword = async (formData: UpdateCurrentPasswordForm) => {
  try {
    const url = `/auth/update-password`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error,{cause:error});
    }
  }
};
