import { useForm } from "react-hook-form";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { XMarkIcon } from "@heroicons/react/20/solid";
import TaskForm from "./TaskForm";
import { useCreateTaskMutation } from "../../hooks/mutations/useTaskMutations";
import type { TaskFormType } from "../../types/task";
import useProjectId from "../../hooks/useProjectId";
import useShowModal from "../../hooks/useShowModal";

export default function AddTaskModal() {
  const projectId = useProjectId();
  const initialValues: TaskFormType = { name: "", description: ""};
  const { showModal, handleClose } = useShowModal("newTask");
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({defaultValues: initialValues});
  const { mutate } = useCreateTaskMutation({reset, projectId});
  const handleCreateTask = (formData: TaskFormType) => {
    mutate({ formData, projectId });
    reset();
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>

        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                      Proyecto
                    </p>
                    <DialogTitle as="h3" className="text-xl font-bold text-slate-100">
                      Nueva Tarea
                    </DialogTitle>
                    <p className="text-sm text-slate-400 mt-1">
                      Llena el formulario para crear una{" "}
                      <span className="text-indigo-400 font-medium">tarea</span>
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Form */}
                <form noValidate onSubmit={handleSubmit(handleCreateTask)} className="space-y-6">
                  <TaskForm errors={errors} register={register} control={control} taskId={''}/>

                  <input
                    type="submit"
                    value="Guardar Tarea"
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
}