import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import ProjectForm from "./ProjectForm";
import type { ProjectFormDataType } from "../../types/project";
import { FiFolderPlus } from "react-icons/fi";

type CreateProjectViewFormProps = {
  handleSubmit: UseFormHandleSubmit<ProjectFormDataType, ProjectFormDataType>
  handleForm: (formData: ProjectFormDataType) => void
  register: UseFormRegister<ProjectFormDataType>
  errors: FieldErrors<ProjectFormDataType>
}

const CreateProjectViewForm = ({ handleSubmit, handleForm, register, errors }: CreateProjectViewFormProps) => {
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      noValidate
      className="space-y-6"
    >
      <ProjectForm register={register} errors={errors} />

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md flex items-center justify-center gap-2"
        >
          <FiFolderPlus className="h-4 w-4" />
          Crear Proyecto
        </button>
      </div>
    </form>
  );
};

export default CreateProjectViewForm;