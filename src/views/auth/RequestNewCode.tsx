import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import { useRequestConfirmationCodeMutation } from "../../hooks/mutations/useAuthMutation";
import type { RequestConfirmationCodeForm } from "../../types/auth";
import DogEar from "../../components/DogEar";

export default function RequestConfirmationCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useRequestConfirmationCodeMutation();

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

    const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#161925] border border-zinc-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150";
    const labelBase = "text-xs font-semibold text-slate-500 uppercase tracking-wide";
    const errorMsg = "text-xs text-red-400 mt-1 flex items-center gap-1";

    return (
        <div className="relative pt-4 w-full max-w-sm">
            {/* Pestaña tipo archivo */}
            <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
                <FiMail className="h-3 w-3 text-indigo-400" />
                <span className="font-mono text-xs text-slate-400">confirmar.auth</span>
            </div>

            <div className="relative bg-[#0f1117] border border-zinc-800 rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-8 overflow-hidden">
                <DogEar />

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-slate-100">Solicitar código de confirmación</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Coloca tu email para recibir un nuevo código de confirmación.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleRequestCode)}
                    className="space-y-5"
                    noValidate
                >
                    <div className="flex flex-col gap-1.5">
                        <label className={labelBase} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            className={`${inputClass} ${errors.email ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30" : ""}`}
                            {...register("email", {
                                required: "El email de registro es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email no válido",
                                },
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

                    <button
                        type="submit"
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                        <FiMail className="h-4 w-4" />
                        Enviar código
                    </button>
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
                            Restablecer
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}