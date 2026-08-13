import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import ProjectForm from "./ProjectForm";
import { useUpdateProjectMutation } from "../../hooks/mutations/useProjectMutations";
import type { EditProjectFormProps, ProjectFormDataType } from "../../types/project";
import DogEar from "../DogEar";

const EditProjectForm = ({ project }: EditProjectFormProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: project.projectName,
      clientName: project.clientName,
      description: project.description,
    },
  });

  const { mutate, isPending } = useUpdateProjectMutation({ projectId, navigate });

  const handleForm = (formData: ProjectFormDataType) => {
    mutate({ projectId, formData });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-10">
      <div className="relative pt-4 w-full max-w-2xl">
        {/* Pestaña tipo archivo — modo edición */}
        <div className="absolute z-100 top-0 left-5 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
          <FiEdit2 className="h-3 w-3 text-amber-400" />
          <span className="font-mono text-xs text-slate-400">editando.wsp</span>
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
          <div className="mb-8 pr-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Workspace
            </p>
            <h1 className="text-2xl font-bold text-slate-100">Editar Proyecto</h1>
            <p className="text-sm text-slate-400 mt-1">
              Modifica los datos del proyecto{" "}
              <span className="text-indigo-400 font-medium">{project.projectName}</span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleForm)}
            noValidate
            className="space-y-6"
          >
            <ProjectForm register={register} errors={errors} />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md flex items-center justify-center gap-2"
              >
                <FiEdit2 className="h-4 w-4" />
                {isPending ? "Guardando Cambios..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProjectForm;