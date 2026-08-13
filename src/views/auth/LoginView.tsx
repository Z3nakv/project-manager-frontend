import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { IoIosLock } from "react-icons/io";
import {
  useAuthenticateUserMutation,
  useGoogleAuthMutation,
  /* useDemoLoginMutation, */
} from "../../hooks/mutations/useAuthMutation";
import type { UserLoginForm } from "../../types/auth";
import FormInput from "../../components/ui/FormInput";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";
import DogEar from "../../components/DogEar";

export default function LoginView() {
  const { authenticateWithGoogle, isPending } = useGoogleAuthMutation();
 /*  const { mutate: loginDemo, isPending: isDemoPending } = useDemoLoginMutation(); */

  const initialValues: UserLoginForm = { email: "", password: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useAuthenticateUserMutation();

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <div className="relative pt-4 w-full max-w-sm">
      {/* Pestaña tipo archivo */}
      <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
        <IoIosLock className="h-3 w-3 text-indigo-400" />
        <span className="font-mono text-xs text-slate-400">sesion.auth</span>
      </div>

      <div className="relative bg-[#0f1117] border border-zinc-800 rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-8 overflow-hidden">
        
        <DogEar />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-100">Iniciar sesión</h1>
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

        {/* Separador */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-wider text-slate-600 font-mono">
            o continúa con
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <GoogleAuthButton
          onSuccessToken={authenticateWithGoogle}
          disabled={isPending}
        />

        {/* Botón demo */}
        {/* <button
          type="button"
          onClick={() => loginDemo()}
          disabled={isDemoPending}
          className="w-full mt-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-50 border border-dashed border-emerald-500/40 text-emerald-400 text-xs font-medium rounded-lg transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2"
        >
          <IoMdEye className="h-3.5 w-3.5" />
          {isDemoPending ? "Cargando demo..." : "Ver demo sin registrarte"}
        </button> */}

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
    </div>
  );
}