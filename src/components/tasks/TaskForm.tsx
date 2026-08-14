import  { type Control, type FieldErrors, type UseFormRegister, Controller } from "react-hook-form";
import LabelPicker from "./LabelPicker/LabelPicker";
import { TaskAttachments } from "./attachments/TaskAttachments";
import type { TaskFormType } from "../../types/task";
import type { Label } from "../../types/label";
import useProjectId from "../../hooks/useProjectId";

type TaskFormProps = {
  register: UseFormRegister<TaskFormType>;
  errors: FieldErrors<TaskFormType>;
  date?: string;
  labels?: Label[];
  control: Control<TaskFormType>;
  taskId: string
};

const inputBase =
  "w-full bg-input border border-border text-text-primary placeholder:text-text-muted text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150";

const labelBase =
  "block text-xs font-semibold uppercase tracking-widest text-text-muted";

const errorMsg = "text-xs text-error mt-1 flex items-center gap-1";

const TaskForm = ({ register, errors, control, taskId }: TaskFormProps) => {
  const projectId = useProjectId();
  return (
    <div className="space-y-5">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className={labelBase}>
          Nombre de la tarea
        </label>
        <input
          id="name"
          type="text"
          placeholder="Ej. Diseñar pantalla de login"
          className={`mt-2 ${inputBase} ${errors.name ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
          {...register("name", {
            required: "El nombre de la tarea es obligatorio",
          })}
        />
        {errors.name && (
          <p className={errorMsg}>
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className={labelBase}>
          Descripción de la tarea
        </label>
        <textarea
          id="description"
          placeholder="Describe brevemente qué hay que hacer…"
          rows={4}
          className={`mt-2 ${inputBase} resize-none ${errors.description ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
          {...register("description", {
            required: "La descripción de la tarea es obligatoria",
          })}
        />
        {
        errors.description && (
          <p className={errorMsg}>
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.description.message}
          </p>
        )}
      </div>

       <TaskAttachments projectId={projectId} taskId={taskId}/>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
          Fecha límite
        </label>
        <input
          id="deadline"
          type="date"
          className="w-full px-3 py-2.5 rounded-lg text-sm text-text-primary bg-input border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150"
          {...register("deadline")}
        />
      </div>

      <Controller
        name="labels"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <LabelPicker
            selectedLabels={field.value ?? []}
            onChange={field.onChange}
          />
        )}
      />

    </div>
  );
};

export default TaskForm;
