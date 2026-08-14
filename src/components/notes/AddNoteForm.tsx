// AddNoteForm.tsx
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router";
import { useCreateNoteMutation } from "../../hooks/mutations/useNotesMutation";
import type { NoteFormData } from "../../types/note";

const AddNoteForm = () => {

  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const initialValues: NoteFormData = {
    content: "",
  };

  const { register, handleSubmit, resetField, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate, isPending } = useCreateNoteMutation({ resetField, projectId, taskId })

  const handleAddNote = (formData: NoteFormData) => mutate({ projectId, taskId, formData });
  
  const inputClass = `
    w-full px-3 py-2.5 rounded-lg text-sm text-text-primary placeholder:text-text-muted
    bg-input border border-border
    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30
    transition-colors duration-150
  `;

  return (
    <form onSubmit={handleSubmit(handleAddNote)} className="space-y-4" noValidate>
      <p className="text-base font-semibold text-text-primary mb-2">Agregar nota</p>

      {/* Contenido */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-muted uppercase tracking-wide" htmlFor="content">
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
          <p className="text-xs text-error">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-primary hover:bg-primary-hover 
        text-text-on-primary text-sm font-semibold rounded-xl transition-colors 
        duration-150 cursor-pointer shadow-md disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'Guardando Nota...' : 'Crear Nota'}
      </button>
    </form>
  );
};

export default AddNoteForm;