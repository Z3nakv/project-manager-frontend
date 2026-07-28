// ProfileForm.tsx
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/profileService";
import type { User } from "../../types/user";
import type { UserProfileForm } from "../../types/profile";

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

  const inputClass = "w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-600 bg-[#252d3d] border border-[#2d3348] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150";

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
          Cuenta
        </p>
        <h1 className="text-3xl font-bold text-slate-100">Mi Perfil</h1>
        <p className="text-sm text-slate-400 mt-1">
          Actualiza tu información personal
        </p>
      </div>

      {/* Card */}
      <div className="bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-8">

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#2d3348]">
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

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20"
            >
              Guardar cambios
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}