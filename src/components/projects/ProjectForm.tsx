import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProjectFormDataType } from "../../types/project";
import { HiOutlineBuildingOffice, HiOutlineClipboardDocumentList  } from "react-icons/hi2";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormDataType>;
  errors: FieldErrors<ProjectFormDataType>;
};

const inputBase =
  "w-full bg-input border border-border text-text-primary placeholder:text-text-muted text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors duration-150";

const labelBase = "text-xs font-semibold text-text-muted uppercase tracking-wide";
  const errorMsg = "text-xs text-error mt-1 flex items-center gap-1";

const ProjectForm = ({ register, errors }: ProjectFormProps) => {
  return (
  <div className="space-y-5">

    <div>
      <label htmlFor="projectName" className={labelBase}>
        Nombre del Proyecto
      </label>
      <div className="relative mt-2">
        <HiOutlineClipboardDocumentList className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          id="projectName"
          placeholder="Ej. Rediseño de sitio web"
          className={`${inputBase} pl-10 ${errors.projectName ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
          {...register("projectName", {
            required: "El título del proyecto es obligatorio",
          })}
        />
      </div>
      {errors.projectName && (
        <p className={errorMsg}>
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
          </svg>
          {errors.projectName.message}
        </p>
      )}
    </div>

    {/* Nombre del cliente */}
    <div>
      <label htmlFor="clientName" className={labelBase}>
        Nombre del Cliente
      </label>
      <div className="relative mt-2">
        <HiOutlineBuildingOffice className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          id="clientName"
          placeholder="Ej. Acme Corp"
          className={`${inputBase} pl-10 ${errors.clientName ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
          {...register("clientName", {
            required: "El nombre del cliente es obligatorio",
          })}
        />
      </div>
      {errors.clientName && (
        <p className={errorMsg}>
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
          </svg>
          {errors.clientName.message}
        </p>
      )}
    </div>

    
    <div>
      <label htmlFor="description" className={labelBase}>
        Descripción
      </label>
      <textarea
        id="description"
        placeholder="Describe brevemente el proyecto y sus objetivos…"
        rows={4}
        className={`mt-2 ${inputBase} resize-none ${errors.description ? "border-error/60 focus:border-error focus:ring-error/30" : ""}`}
        {...register("description", {
          required: "La descripción es obligatoria",
        })}
      />
      {errors.description && (
        <p className={errorMsg}>
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
          </svg>
          {errors.description.message}
        </p>
      )}
    </div>

  </div>
);
};

export default ProjectForm;