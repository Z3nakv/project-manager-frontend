import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useNavigate } from "react-router";
import TaskForm from "../TaskForm";
import { useForm } from "react-hook-form";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useUpdateTaskMutation } from "../../../hooks/mutations/useTaskMutations";
import type { TaskFormType, TaskProjectType } from "../../../types/task";
import useProjectId from "../../../hooks/useProjectId";

type EditTaskModalProps = {
  taskData: TaskProjectType;
  taskId: TaskProjectType["_id"];
};

const EditTaskModal = ({ taskData, taskId }: EditTaskModalProps) => {

  const navigate = useNavigate();
  const projectId = useProjectId();

  const deadlineDate = taskData.deadline ? taskData.deadline.slice(0, 10) : undefined;
  const labels = taskData.labels
  const { register, handleSubmit, formState: { errors }, control } = useForm<TaskFormType>({
    defaultValues: { name: taskData.name, description: taskData.description, deadline: deadlineDate || undefined, labels: labels },
  });

  const { mutate } = useUpdateTaskMutation({ taskId, projectId })

  const handleEditTask = (formData: TaskFormType) => mutate({ taskId, projectId, formData });

  const handleClose = () => navigate(location.pathname, { replace: true });

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-200" onClose={handleClose}>

        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              {/* Wrapper de carpeta/archivo */}
              <div className="relative pt-7 w-full max-w-lg m-auto mt-30">
                {/* Pestaña tipo archivo — modo edición */}
                <div className="absolute top-0 left-6 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
                  <PencilSquareIcon className="h-3.5 w-3.5 text-amber-400" />
                  <span className="font-mono text-xs text-slate-400">editando.task</span>
                </div>

                <button
                  onClick={handleClose}
                  className="absolute top-1 right-0 cursor-pointer p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150 z-10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <DialogPanel className="relative max-h-[80vh] overflow-y-auto overflow-x-hidden scrollbar-thumb-indigo-50 scrollbar-auto bg-[#0f1117] border border-zinc-800 rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">
                  {/* Dog-ear */}
                  <div
                    className="absolute top-0 right-0 w-0 h-0"
                    style={{
                      borderWidth: "0 36px 36px 0",
                      borderStyle: "solid",
                      borderColor: "transparent transparent #252d3d transparent",
                    }}
                  />

                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                      Tarea
                    </p>
                    <DialogTitle as="h3" className="text-xl font-bold text-slate-100 pr-6">
                      Editar Tarea
                    </DialogTitle>
                    <p className="text-sm text-slate-400 mt-1">
                      Realiza cambios a{" "}
                      <span className="text-indigo-400 font-medium">{taskData.name}</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-zinc-800 mb-6" />

                  {/* Form */}
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handleEditTask)}
                    noValidate
                  >
                    <TaskForm errors={errors} register={register} control={control} taskId={taskId} />

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md flex items-center justify-center gap-2"
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                      Guardar Cambios
                    </button>
                  </form>
                </DialogPanel>
              </div>
            </TransitionChild>
          </div>
        </div>

      </Dialog>
    </Transition>
  );
};

export default EditTaskModal;