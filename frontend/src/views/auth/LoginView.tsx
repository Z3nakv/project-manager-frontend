import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types";
import { Link } from "react-router";
import { useAuthenticateUserMutation } from "../../hooks/mutations/useAuthMutation";

export default function LoginView() {
  

  const initialValues: UserLoginForm = { email: "", password: "" };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useAuthenticateUserMutation()

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  const errorMsg = "text-xs text-red-400 mt-1 flex items-center gap-1";

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
          {errors.email && (
          <p className={errorMsg}>
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email.message}
          </p>
        )}
          {/* {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>} */}
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
          {errors.password && (
          <p className={errorMsg}>
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
            </svg>
            {errors.password.message}
          </p>
        )}
          {/* {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>} */}
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