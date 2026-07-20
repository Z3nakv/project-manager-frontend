import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { changePassword } from "../../services/profileService";
import ErrorMessage from "../../components/ErrorMessage";
import type { UpdateCurrentPasswordForm } from "../../types/auth";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentPasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const password = watch("password");
  const handleChangePassword = (formData: UpdateCurrentPasswordForm) => mutate(formData);

  const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#252d3d] border border-[#2d3348] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150";

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
          Seguridad
        </p>
        <h1 className="text-3xl font-bold text-slate-100">Cambiar Password</h1>
        <p className="text-sm text-slate-400 mt-1">
          Utiliza este formulario para cambiar tu password
        </p>
      </div>

      {/* Card */}
      <div className="bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-8">
        <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-5" noValidate>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="current_password">
              Password Actual
            </label>
            <input
              id="current_password"
              type="password"
              placeholder="••••••••"
              className={inputClass}
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.current_password && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="password">
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={inputClass}
              {...register("password", {
                required: "El nuevo password es obligatorio",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="password_confirmation">
              Repetir Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              className={inputClass}
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: (value) => value === password || "Los passwords no coinciden",
              })}
            />
            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20"
            >
              Cambiar Password
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}