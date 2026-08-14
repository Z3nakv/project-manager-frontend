import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiLock } from "react-icons/fi";
import { changePassword } from "../../services/profileService";
import type { UpdateCurrentPasswordForm } from "../../types/auth";
import DogEar from "../../components/DogEar";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentPasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const password = useWatch({ control, name: 'password' });
  const handleChangePassword = (formData: UpdateCurrentPasswordForm) => mutate(formData);

  const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm text-text-primary placeholder:text-text-muted bg-input border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150";
  const labelBase = "text-xs font-semibold text-text-muted uppercase tracking-wide";
  const errorMsg = "text-xs text-error mt-1 flex items-center gap-1";

  return (
    <div className="min-h-full flex items-center justify-center py-10">
      <div className="relative pt-4 w-full max-w-2xl mr-10">
        {/* Pestaña tipo archivo */}
        <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5">
          <FiLock className="h-3 w-3 text-warning" />
          <span className="font-mono text-xs text-text-muted">seguridad.usr</span>
        </div>

        <div className="relative bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-lifted p-8 overflow-hidden">
          <DogEar />

          {/* Header */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
              Seguridad
            </p>
            <h1 className="text-2xl font-bold text-text-primary">Cambiar Password</h1>
            <p className="text-sm text-text-secondary mt-1">
              Utiliza este formulario para cambiar tu password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-5" noValidate>

            <div className="flex flex-col gap-1.5">
              <label className={labelBase} htmlFor="current_password">
                Password Actual
              </label>
              <input
                id="current_password"
                type="password"
                placeholder="••••••••"
                className={`${inputClass} ${errors.current_password ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
                {...register("current_password", {
                  required: "El password actual es obligatorio",
                })}
              />
              {errors.current_password && (
                <p className={errorMsg}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.current_password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelBase} htmlFor="password">
                Nuevo Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`${inputClass} ${errors.password ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
                {...register("password", {
                  required: "El nuevo password es obligatorio",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                })}
              />
              {errors.password && (
                <p className={errorMsg}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelBase} htmlFor="password_confirmation">
                Repetir Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                placeholder="••••••••"
                className={`${inputClass} ${errors.password_confirmation ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
                {...register("password_confirmation", {
                  required: "Este campo es obligatorio",
                  validate: (value) => value === password || "Los passwords no coinciden",
                })}
              />
              {errors.password_confirmation && (
                <p className={errorMsg}>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-primary/20 flex items-center justify-center gap-2"
              >
                <FiLock className="h-4 w-4" />
                Cambiar Password
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}