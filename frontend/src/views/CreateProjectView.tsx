import { useForm } from "react-hook-form";
import type { ProjectFormDataType } from "../types";
import { Link, useNavigate } from "react-router";
import ProjectForm from "../components/projects/ProjectForm";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../services/ProjectService";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

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

  const { mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      toast.success(data)
      navigate("/")
    },
    onError: (error) => toast.error(error.message),
  });

  const handleForm = (formData: ProjectFormDataType) => mutate({ formData });

  return (
    <div className="max-w-2xl mx-auto">

      {/* ── Header ─────────────────────────────────────────── */}
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

        <Link
          to="/"
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
            value="Crear Proyecto"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md"
          />
        </div>
      </form>

    </div>
  );
};

export default CreateProjectView;