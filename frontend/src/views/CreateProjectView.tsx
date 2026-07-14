import { useForm } from "react-hook-form";
import type { ProjectFormDataType } from "../types";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/ProjectService";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import CreateProjectViewForm from "../components/projects/CreateProjectViewForm";

const CreateProjectView = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

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
      toast.success(data);
      queryClient.invalidateQueries({queryKey: ['projects']});
      navigate("/dashboard");
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
          to="/dashboard"
          className="flex items-center gap-2 bg-[#1e2330] hover:bg-[#252d3d] border border-[#2d3348] text-slate-300 hover:text-slate-100 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 shadow-md shrink-0"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver
        </Link>
      </div>

      {/* ── Form card ──────────────────────────────────────── */}
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