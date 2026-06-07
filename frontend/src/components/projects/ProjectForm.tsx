import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProjectFormDataType } from "../../types";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormDataType>;
  errors: FieldErrors<ProjectFormDataType>;
};

const inputBase =
  "w-full bg-[#151921] border border-[#2d3348] text-slate-200 placeholder-slate-600 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors duration-150";

const labelBase = "block text-xs font-semibold uppercase tracking-widest text-slate-400";

const errorMsg = "text-xs text-red-400 mt-1 flex items-center gap-1";

const ProjectForm = ({ register, errors }: ProjectFormProps) => {
  return (
    <div className="space-y-5">

      {/* Nombre del proyecto */}
      <div>
        <label htmlFor="projectName" className={labelBase}>
          Nombre del Proyecto
        </label>
        <input
          type="text"
          id="projectName"
          placeholder="Ej. Rediseño de sitio web"
          className={`mt-2 ${inputBase} ${errors.projectName ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30" : ""}`}
          {...register("projectName", {
            required: "El título del proyecto es obligatorio",
          })}
        />
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
        <input
          type="text"
          id="clientName"
          placeholder="Ej. Acme Corp"
          className={`mt-2 ${inputBase} ${errors.clientName ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30" : ""}`}
          {...register("clientName", {
            required: "El nombre del cliente es obligatorio",
          })}
        />
        {errors.clientName && (
          <p className={errorMsg}>
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clipRule="evenodd" />
            </svg>
            {errors.clientName.message}
          </p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className={labelBase}>
          Descripción
        </label>
        <textarea
          id="description"
          placeholder="Describe brevemente el proyecto y sus objetivos…"
          rows={4}
          className={`mt-2 ${inputBase} resize-none ${errors.description ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30" : ""}`}
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