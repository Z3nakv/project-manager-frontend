import { useForm } from "react-hook-form";
import type { UserRegistrationForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage";
import { createAccount } from "../../services/authService";
import { Link } from "react-router";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch("password");

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#252d3d] border border-[#2d3348] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150";

  return (
    <div className="bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Crear cuenta</h1>
        <p className="text-sm text-slate-400 mt-1">Llena el formulario para registrarte</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-5" noValidate>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className={inputClass}
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className={inputClass}
            {...register("email", {
              required: "El email es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "Email no válido" },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className={inputClass}
            {...register("password", {
              required: "El password es obligatorio",
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
            Crear cuenta
          </button>
        </div>

      </form>

      {/* Footer */}
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-150">
            Iniciar sesión
          </Link>
        </p>
        <p className="text-center text-sm text-slate-500">
          ¿Olvidaste tu password?{" "}
          <Link to="/auth/forgot-password" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-150">
            Reestablecer
          </Link>
        </p>
      </div>

    </div>
  );
}