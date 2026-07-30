import { useForm } from "react-hook-form";
import { Link } from "react-router";
import {
  useAuthenticateUserMutation,
  useGoogleAuthMutation,
} from "../../hooks/mutations/useAuthMutation";
import type { UserLoginForm } from "../../types/auth";
import FormInput from "../../components/ui/FormInput";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";

export default function LoginView() {
  const { authenticateWithGoogle, isPending } = useGoogleAuthMutation();

  const initialValues: UserLoginForm = { email: "", password: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useAuthenticateUserMutation();

  const handleLogin = (formData: UserLoginForm) => mutate(formData);
  
  return (
    <div className="bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Iniciar sesión</h1>
        <p className="text-sm text-slate-400 mt-1">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-5"
        noValidate
      >
        <FormInput
          id="email"
          type="email"
          label="Email"
          placeholder="tucorreo@ejemplo.com"
          error={errors.email?.message}
          {...register("email", {
            required: "El email es obligatorio",
            pattern: { value: /\S+@\S+\.\S+/, message: "Email no válido" },
          })}
        />

        <FormInput
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          labelExtra={
            <Link
              to="/auth/forgot-password"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
            >
              ¿Olvidaste tu password?
            </Link>
          }
          {...register("password", {
            required: "El password es obligatorio",
          })}
        />

        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20"
        >
          Iniciar sesión
        </button>
      </form>

      <GoogleAuthButton
        onSuccessToken={authenticateWithGoogle}
        disabled={isPending}
      />

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 mt-6">
        ¿No tienes cuenta?{" "}
        <Link
          to="/auth/register"
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-150"
        >
          Crear una cuenta
        </Link>
      </p>
    </div>
  );
}
