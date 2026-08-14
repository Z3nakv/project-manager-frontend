import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { IoIosLock } from "react-icons/io";
import {
  useAuthenticateUserMutation,
  useGoogleAuthMutation,
} from "../../hooks/mutations/useAuthMutation";
import type { UserLoginForm } from "../../types/auth";
import FormInput from "../../components/ui/FormInput";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";
import DogEar from "../../components/DogEar";

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
    <div className="relative pt-4 w-full max-w-sm m-auto">
      {/* Pestaña tipo archivo */}
      <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5">
        <IoIosLock className="h-3 w-3 text-accent" />
        <span className="font-mono text-xs text-text-muted">sesion.auth</span>
      </div>

      <div className="relative bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-lifted p-8 overflow-hidden">
        
        <DogEar />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-text-primary">Iniciar sesión</h1>
          <p className="text-sm text-text-secondary mt-1">
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
                className="text-xs text-accent hover:text-ring transition-colors duration-150"
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
            className="w-full py-2.5 bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-primary/20"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Separador */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
            o continúa con
          </span>
          <div className="flex-1 h-px bg-border-subtle" />
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
        <p className="text-center text-sm text-text-muted mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/auth/register"
            className="text-accent hover:text-ring font-medium transition-colors duration-150"
          >
            Crear una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}