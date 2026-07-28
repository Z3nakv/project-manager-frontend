import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import ProjectForm from "./ProjectForm";
import type { ProjectFormDataType } from "../../types/project";

type CreateProjectViewFormProps = {
    handleSubmit: UseFormHandleSubmit<ProjectFormDataType, ProjectFormDataType>
    handleForm: (formData: ProjectFormDataType) => void 
    register: UseFormRegister<ProjectFormDataType>
    errors: FieldErrors<ProjectFormDataType>
}

const CreateProjectViewForm = ({handleSubmit, handleForm, register, errors} : CreateProjectViewFormProps) => {
  return (
    <>
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className="bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-8 space-y-6"
      >
        <ProjectForm register={register} errors={errors} />

        <div className="pt-2">
          <input
            type="submit"
            value="Crear Proyecto"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md"
          />
        </div>
      </form>
    </>
  );
};

export default CreateProjectViewForm;
