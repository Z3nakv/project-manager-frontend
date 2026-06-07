import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { authenticateUser } from "../../services/authService";
import ErrorMessage from "../../components/ErrorMessage";

export default function LoginView() {
  const navigate = useNavigate();

  const initialValues: UserLoginForm = { email: "", password: "" };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: () => navigate("/"),
    onError: (error) => toast.error(error.message),
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <div className="bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Iniciar sesión</h1>
        <p className="text-sm text-slate-400 mt-1">Ingresa tus credenciales para continuar</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5" noValidate>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className="w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#252d3d] border border-[#2d3348] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "Email no válido" },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="password">
              Password
            </label>
            <Link to="/auth/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150">
              ¿Olvidaste tu password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#252d3d] border border-[#2d3348] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150"
            {...register("password", { required: "El password es obligatorio" })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20"
        >
          Iniciar sesión
        </button>

      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 mt-6">
        ¿No tienes cuenta?{" "}
        <Link to="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-150">
          Crear una cuenta
        </Link>
      </p>

    </div>
  );
}