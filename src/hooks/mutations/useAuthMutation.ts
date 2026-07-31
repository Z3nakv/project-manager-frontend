import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateUser, confirmAccount, createAccount, forgotPassword, googleAuth, requestConfirmationCode, updatePasswordWithToken, validateToken } from "../../services/authService";
import { toast } from "react-toastify";
import type { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router";
import type { ForgotPasswordForm, UserRegistrationForm } from "../../types/auth";
import { setAccessToken } from "../../utils/auth";

type useCreateAccountMutationProps = {
    reset: UseFormReset<UserRegistrationForm>
}
export const useCreateAccountMutation = ({ reset } : useCreateAccountMutationProps) => {
    return useMutation({
        mutationFn: createAccount,
        onSuccess: (data) => {
          toast.success(data);
          reset();
        },
        onError: (error) => toast.error(error.message),
      });
}

export const useConfirmAccountMutation = () => {
    return useMutation({
        mutationFn: confirmAccount,
        onSuccess: (data) => {
          toast.success(data)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
}

export const useRequestConfirmationCodeMutation = () => {
    return useMutation({
            mutationFn: requestConfirmationCode,
            onSuccess: (data) => {
                toast.success(data)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
}

export const useAuthenticateUserMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authenticateUser,
        onSuccess: async (data) => {
                setAccessToken(data.accessToken)
                queryClient.removeQueries({ queryKey: ['user'] })
                navigate("/dashboard")
            },
        onError: (error) => toast.error(error.message),
      });
}

type useForgotPasswordMutationProps = {
    reset: UseFormReset<ForgotPasswordForm>
}

export const useForgotPasswordMutation = ({ reset } : useForgotPasswordMutationProps) => {
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
          toast.success(data)
          reset();
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
}

type useValidateTokenProps = {
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export const useValidateTokenMutation = ({ setIsValidToken } : useValidateTokenProps) => {
    
    return useMutation({
            mutationFn: validateToken,
            onSuccess: (data) => {
                toast.success(data)
                setIsValidToken(true)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
}

export const useUpdatePasswordWithTokenMutation = () => {
    const navigate = useNavigate();
    return useMutation({
            mutationFn: updatePasswordWithToken,
            onSuccess: (data) => {
                toast.success(data)
                navigate('/auth/login')
            }, 
            onError: (error) => {
                toast.error(error.message)
            }
        })
}

export const useGoogleAuthMutation = () => {
    
    const navigate = useNavigate();
        const queryClient = useQueryClient();

    const { mutate: authenticateWithGoogle, isPending } = useMutation({
        mutationFn: googleAuth,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            queryClient.setQueryData(['user'], data.user);
            toast.success('Sesion iniciada correctamente');
            navigate('/dashboard',{ replace: true });
        }
    })
    return { authenticateWithGoogle, isPending }
}
