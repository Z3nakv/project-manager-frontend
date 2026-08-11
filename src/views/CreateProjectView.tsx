import { useForm } from "react-hook-form";
import CreateProjectViewForm from "../components/projects/CreateProjectViewForm";
import { useCreateProjectMutation } from "../hooks/mutations/useProjectMutations";
import type { ProjectFormDataType } from "../types/project";

const CreateProjectView = () => {

  const initialValues: ProjectFormDataType = {
    projectName: "",
    clientName: "",
    description: ""
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const { mutate } = useCreateProjectMutation()
  const handleForm = (formData: ProjectFormDataType) => mutate({ formData });
  return (
    <div className="h-full flex flex-col justify-center items-center max-w-2xl mx-auto">

      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
            Workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-100">Crear Proyecto</h1>
          <p className="text-sm text-slate-400 mt-1">
            Llena el siguiente formulario para crear un proyecto
          </p>
        </div>

        {/* <Link
          to="/dashboard"
          className="flex items-center gap-2 bg-[#1e2330] hover:bg-[#252d3d] border border-[#2d3348] text-slate-300 hover:text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md shrink-0"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver
        </Link> */}
      </div>

      <CreateProjectViewForm 
      handleSubmit={handleSubmit} 
      handleForm={handleForm} 
      register={register} 
      errors={errors} 
      />

    </div>
  );
};

export default CreateProjectView;