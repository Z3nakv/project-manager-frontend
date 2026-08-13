import { useForm } from "react-hook-form";
import { FiArrowLeft, FiFolderPlus } from "react-icons/fi";
import CreateProjectViewForm from "../components/projects/CreateProjectViewForm";
import { useCreateProjectMutation } from "../hooks/mutations/useProjectMutations";
import type { ProjectFormDataType } from "../types/project";
import DogEar from "../components/DogEar";
import { useNavigate } from "react-router";

const CreateProjectView = () => {
  const navigate = useNavigate();
  const initialValues: ProjectFormDataType = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const { mutate } = useCreateProjectMutation();
  const handleForm = (formData: ProjectFormDataType) => mutate({ formData });

  return (
    <div className="min-h-full flex items-center justify-center py-10">
      <div className="relative pt-4 w-full max-w-2xl">
        {/* Pestaña tipo archivo */}
        <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
          <FiFolderPlus className="h-3 w-3 text-indigo-400" />
          <span className="font-mono text-xs text-slate-400">
            nuevo-proyecto.wsp
          </span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="absolute -top-10 right-0 flex items-center gap-2 bg-[#161925] hover:bg-[#1c2130] border border-zinc-800 text-slate-300 hover:text-slate-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer z-10"
        >
          <FiArrowLeft className="h-3.5 w-3.5" />
          Volver
        </button>

        <div className="relative bg-[#0f1117] border border-zinc-800 rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-8 overflow-hidden">
          <DogEar />

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Workspace
            </p>
            <h1 className="text-2xl font-bold text-slate-100">
              Crear Proyecto
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Llena el siguiente formulario para crear un proyecto
            </p>
          </div>

          <CreateProjectViewForm
            handleSubmit={handleSubmit}
            handleForm={handleForm}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProjectView;
