import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import ProjectForm from "./ProjectForm";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useUpdateProjectMutation } from "../../hooks/mutations/useProjectMutations";
import type { EditProjectFormProps, ProjectFormDataType } from "../../types/project";



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
    <div className="max-w-2xl mx-auto">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
            Workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-100">Editar Proyecto</h1>
          <p className="text-sm text-slate-400 mt-1">
            Modifica los datos del proyecto <span className="text-indigo-400 font-medium">{project.projectName}</span>
          </p>
        </div>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 bg-[#1e2330] hover:bg-[#252d3d] border border-[#2d3348] text-slate-300 hover:text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md shrink-0"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver
        </Link>
      </div>

      {/* ── Form card ──────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit(handleForm)}
        noValidate
        className="bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-8 space-y-6"
      >
        <ProjectForm register={register} errors={errors} />

        <div className="pt-2">
          <input
            type="submit"
            value={isPending ? 'Guardando Cambios...' : 'Guardar Cambios'}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md"
            disabled={isPending}
          />
        </div>
      </form>

    </div>
  );
};

export default EditProjectForm;