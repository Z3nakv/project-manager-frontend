import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";
import { FiUserPlus } from "react-icons/fi";
import { useCreateAccountMutation } from "../../hooks/mutations/useAuthMutation";
import type { UserRegistrationForm } from "../../types/auth";
import DogEar from "../../components/DogEar";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = useWatch({ control, name: 'password' });

  const { mutate } = useCreateAccountMutation({ reset })

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm text-text-primary placeholder:text-text-muted bg-input border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150";
  const labelBase = "text-xs font-semibold text-text-muted uppercase tracking-wide";
  const errorMsg = "text-xs text-error mt-1 flex items-center gap-1";

  return (
    <div className="relative pt-4 w-full max-w-sm">
      {/* Pestaña tipo archivo */}
      <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5">
        <FiUserPlus className="h-3 w-3 text-accent" />
        <span className="font-mono text-xs text-text-muted">nueva-cuenta.auth</span>
      </div>

      <div className="relative bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-lifted p-8 overflow-hidden">
        <DogEar />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-text-primary">Crear cuenta</h1>
          <p className="text-sm text-text-secondary mt-1">Llena el formulario para registrarte</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5" noValidate>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase} htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              className={inputClass}
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <p className={errorMsg}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase} htmlFor="email">
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
            {errors.email && (
              <p className={errorMsg}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelBase} htmlFor="password">
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
              className={inputClass}
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
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-primary/20"
            >
              Crear cuenta
            </button>
          </div>

        </form>

        {/* Footer */}
        <div className="flex flex-col gap-2 mt-6">
          <p className="text-center text-sm text-text-muted">
            ¿Ya tienes cuenta?{" "}
            <Link to="/auth/login" className="text-accent hover:text-ring font-medium transition-colors duration-150">
              Iniciar sesión
            </Link>
          </p>
          <p className="text-center text-sm text-text-muted">
            ¿Olvidaste tu password?{" "}
            <Link to="/auth/forgot-password" className="text-accent hover:text-ring font-medium transition-colors duration-150">
              Reestablecer
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}