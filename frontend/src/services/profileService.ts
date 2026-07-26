import { httpPost, httpPut } from "../lib/http";
import type { UserProfileForm } from "../types/profile";
import type { UpdateCurrentPasswordForm } from "../types/auth";

export const updateProfile = async (formData: UserProfileForm) => {
  const url = "/auth/profile";
  return httpPut<string>(url, formData);
};

export const changePassword = async (formData: UpdateCurrentPasswordForm) => {
  const url = "/auth/update-password";
  return httpPost<string>(url, formData);
};
