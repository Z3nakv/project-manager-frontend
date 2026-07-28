import type { UserProfileForm } from "../types/profile";
import type { UpdateCurrentPasswordForm } from "../types/auth";
import { httpPost, httpPut } from "../lib/http";

type MessageResponse = { message: string };

export const updateProfile = async (formData: UserProfileForm) => {
    const url = `/auth/profile`;
    const data = await httpPut<MessageResponse>(url, formData);
    return data.message;
};

export const changePassword = async (formData: UpdateCurrentPasswordForm) => {
    const url = `/auth/update-password`;
    const data = await httpPost<MessageResponse>(url, formData);
    return data.message;
};
