import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import ProjectForm from "./ProjectForm";
import type { ProjectFormDataType } from "../../types/project";
import { BsFolderPlus } from "react-icons/bs";

type CreateProjectViewFormProps = {
    handleSubmit: UseFormHandleSubmit<ProjectFormDataType, ProjectFormDataType>
    handleForm: (formData: ProjectFormDataType) => void 
    register: UseFormRegister<ProjectFormDataType>
    errors: FieldErrors<ProjectFormDataType>
}

const CreateProjectViewForm = ({handleSubmit, handleForm, register, errors} : CreateProjectViewFormProps) => {
  return (
  <div className="relative pt-4 max-w-md mx-auto">
    {/* Pestaña de la carpeta */}
    <div className="absolute top-0 left-5 flex items-center gap-1.5 bg-[#1e2330] border border-[#2d3348] border-b-0 rounded-t-md px-3.5 pt-1.5 pb-1">
      <BsFolderPlus  className="w-4 h-4 text-indigo-400" />
      <span className="text-xs font-medium text-slate-400">Nuevo proyecto</span>
    </div>

    <form
      onSubmit={handleSubmit(handleForm)}
      noValidate
      className="bg-[#1e2330] border border-[#2d3348] rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-8 space-y-6"
    >
      <ProjectForm register={register} errors={errors} />

      <div className="pt-2">
        <input
          type="submit"
          value="Crear Proyecto"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md flex items-center justify-center gap-2"
        />
      </div>
    </form>
  </div>
);
};

export default CreateProjectViewForm;
