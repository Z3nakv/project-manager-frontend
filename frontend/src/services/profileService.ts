import { post, put, throwApiError } from "../lib/axios";
import type { UserProfileForm } from "../types/profile";
import type { UpdateCurrentPasswordForm } from "../types/auth";

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const url = "/auth/profile";
    return await put<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};

export const changePassword = async (formData: UpdateCurrentPasswordForm) => {
  try {
    const url = "/auth/update-password";
    return await post<string>(url, formData);
  } catch (error) {
    throwApiError(error);
  }
};