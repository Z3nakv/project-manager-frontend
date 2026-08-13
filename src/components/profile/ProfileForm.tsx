import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/profileService";
import type { User } from "../../types/user";
import type { UserProfileForm } from "../../types/profile";
import DogEar from "../DogEar";

type ProfileFormProps = {
  data: User;
};

export default function ProfileForm({ data }: ProfileFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

  const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#161925] border border-zinc-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150";
  const labelBase = "text-xs font-semibold text-slate-500 uppercase tracking-wide";
  const errorMsg = "text-xs text-red-400 mt-1 flex items-center gap-1";

  return (
    <div className="min-h-full flex items-center justify-center py-10">
      <div className="relative pt-4 w-full max-w-2xl mr-10">
        {/* Pestaña tipo archivo */}
        <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
          <FiUser className="h-3 w-3 text-indigo-400" />
          <span className="font-mono text-xs text-slate-400">perfil.usr</span>
        </div>

        <div className="relative bg-[#0f1117] border border-zinc-800 rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-8 overflow-hidden">
          <DogEar />

          {/* Header */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Cuenta
            </p>
            <h1 className="text-2xl font-bold text-slate-100">Mi Perfil</h1>
            <p className="text-sm text-slate-400 mt-1">
              Actualiza tu información personal
            </p>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <span className="text-white font-bold text-xl">
                {data.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-slate-200 font-semibold">{data.name}</p>
              <p className="text-slate-500 text-sm">{data.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleEditProfile)} className="space-y-5" noValidate>

            <div className="flex flex-col gap-1.5">
              <label className={labelBase} htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                className={`${inputClass} ${errors.name ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30" : ""}`}
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
                className={`${inputClass} ${errors.email ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30" : ""}`}
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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <FiUser className="h-4 w-4" />
                Guardar cambios
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}