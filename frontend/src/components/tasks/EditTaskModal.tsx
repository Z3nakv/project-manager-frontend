import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useNavigate, useParams } from "react-router";
import TaskForm from "./TaskForm";
import type { TaskFormType, TaskProjectType } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../services/taskServices";
import { XMarkIcon } from "@heroicons/react/20/solid";

type EditTaskModalProps = {
  data: TaskProjectType;
  taskID: TaskProjectType["_id"];
};

const EditTaskModal = ({ data, taskID }: EditTaskModalProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const projectID = params.projectID!;
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormType>({
    defaultValues: { name: data.name, description: data.description },
  });

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskID] });
      queryClient.invalidateQueries({ queryKey: ["project", projectID] }); 
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => console.log(error.message),
  });

  const handleEditTask = (formData: TaskFormType) =>
    mutate({ taskID, projectID, formData });

  const handleClose = () => navigate(location.pathname, { replace: true });

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>

        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200"  leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"  leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                      Tarea
                    </p>
                    <DialogTitle as="h3" className="text-xl font-bold text-slate-100">
                      Editar Tarea
                    </DialogTitle>
                    <p className="text-sm text-slate-400 mt-1">
                      Realiza cambios a{" "}
                      <span className="text-indigo-400 font-medium">{data.name}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="ml-4 p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150 shrink-0"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-[#2d3348] mb-6" />

                {/* Form */}
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(handleEditTask)}
                  noValidate
                >
                  <TaskForm errors={errors} register={register} />

                  <input
                    type="submit"
                    value="Guardar Cambios"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md"
                  />
                </form>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>

      </Dialog>
    </Transition>
  );
};

export default EditTaskModal;