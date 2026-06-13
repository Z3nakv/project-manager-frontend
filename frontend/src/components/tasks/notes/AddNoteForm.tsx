// AddNoteForm.tsx
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";
import type { NoteFormData } from "../../../types";
import { createNote } from "../../../services/NoteService";
import { toast } from "react-toastify";

const AddNoteForm = () => {

  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectID = params.projectID!;
  const taskID = queryParams.get("viewTask")!;

  const initialValues: NoteFormData = {
    content: "",
  };

  const { register, handleSubmit, resetField, formState: { errors } } = useForm({ defaultValues: initialValues });


  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["task", taskID] });
      resetField('content')
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddNote = (formData: NoteFormData) => mutate({ projectID, taskID, formData });
  
  const inputClass = `
    w-full px-3 py-2.5 rounded-lg text-sm text-slate-200 placeholder-slate-500
    bg-[#252d3d] border border-[#2d3348]
    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
    transition-colors duration-150
  `;

  return (
    <form onSubmit={handleSubmit(handleAddNote)} className="space-y-4" noValidate>
      <p className="text-base font-semibold text-slate-300 mb-2">Agregar nota</p>

      {/* Contenido */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide" htmlFor="content">
          Contenido
        </label>
        <input
          id="content"
          type="text"
          placeholder="Escribe el contenido de la nota..."
          className={inputClass}
          {...register("content", { required: "El contenido es obligatorio" })}
        />
        {errors.content && (
          <p className="text-xs text-red-400">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer"
        disabled={isPending}
      >
        {isPending ? 'Guardando Nota...' : 'Crear Nota'}
      </button>
    </form>
  );
};

export default AddNoteForm;