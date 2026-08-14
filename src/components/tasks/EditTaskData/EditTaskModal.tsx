import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useNavigate } from "react-router";
import TaskForm from "../TaskForm";
import { useForm } from "react-hook-form";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useUpdateTaskMutation } from "../../../hooks/mutations/useTaskMutations";
import type { TaskFormType, TaskProjectType } from "../../../types/task";
import useProjectId from "../../../hooks/useProjectId";
import DogEar from "../../DogEar";

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
          <div className="fixed inset-0 bg-overlay backdrop-blur-sm" />
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
                <div className="absolute top-0 left-6 h-7 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5">
                  <PencilSquareIcon className="h-3.5 w-3.5 text-warning" />
                  <span className="font-mono text-xs text-text-muted">editando.task</span>
                </div>

                <button
                  onClick={handleClose}
                  className="absolute top-1 right-0 cursor-pointer p-1.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors duration-150 z-10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <DialogPanel className="relative max-h-[80vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-overlay p-8">
                  <DogEar />

                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
                      Tarea
                    </p>
                    <DialogTitle as="h3" className="text-xl font-bold text-text-primary pr-6">
                      Editar Tarea
                    </DialogTitle>
                    <p className="text-sm text-text-secondary mt-1">
                      Realiza cambios a{" "}
                      <span className="text-accent font-medium">{taskData.name}</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border-subtle mb-6" />

                  {/* Form */}
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handleEditTask)}
                    noValidate
                  >
                    <TaskForm errors={errors} register={register} control={control} taskId={taskId} />

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md flex items-center justify-center gap-2"
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