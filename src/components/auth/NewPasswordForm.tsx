import { useForm, useWatch } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useUpdatePasswordWithTokenMutation } from "../../hooks/mutations/useAuthMutation";
import type { ConfirmToken, NewPasswordForm } from "../../types/auth";

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}


export default function NewPasswordForm({token} : NewPasswordFormProps) {
    
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, formState: { errors }, control } = useForm({ defaultValues: initialValues });
    const password = useWatch({ control, name: 'password'});

    const { mutate } = useUpdatePasswordWithTokenMutation()

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data);
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10 bg-surface-base border border-border rounded-xl mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl text-text-primary"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3 border border-border rounded-lg bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl text-text-primary"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3 border border-border rounded-lg bg-input text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-primary hover:bg-primary-hover w-full p-3 text-text-on-primary font-black text-xl cursor-pointer rounded-lg"
                />
            </form>
        </>
    )
}