import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "../../types";
import { findUserByEmail } from "../../services/teamService";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams();
    const projectID = params.projectID!;

    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: findUserByEmail,
        onSuccess: (data) => {
            queryClient.setQueryData(['user', data?.email], data)
        }
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {projectID, formData};
        mutation.mutate(data);
    }

    const resetData = () => {
        reset()
        mutation.reset()
    }

    return (
        <div className="space-y-5">
            <form onSubmit={handleSubmit(handleSearchUser)} className="space-y-4" noValidate>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="email">
                        Email del usuario
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

                <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-md shadow-indigo-500/20"
                    disabled={mutation.isPending}
                >
                    Buscar usuario
                </button>
            </form>

            {/* Resultado */}
            <div>
                {mutation.isPending && (
                    <div className="flex items-center justify-center py-6">
                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                {mutation.error && (
                    <p className="text-center text-sm text-red-400 py-4">{mutation.error.message}</p>
                )}
                {mutation.data && (
                    <SearchResult user={mutation.data} reset={resetData} />
                )}
            </div>
        </div>
    );
}