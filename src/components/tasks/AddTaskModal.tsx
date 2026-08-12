import { useForm } from "react-hook-form";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { DocumentPlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import TaskForm from "./TaskForm";
import { useCreateTaskMutation } from "../../hooks/mutations/useTaskMutations";
import type { TaskFormType } from "../../types/task";
import useProjectId from "../../hooks/useProjectId";
import useShowModal from "../../hooks/useShowModal";
import DogEar from "../DogEar";
import { useState } from "react";

export default function AddTaskModal() {
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());
  const projectId = useProjectId();
  const initialValues: TaskFormType = { name: "", description: "" };
  const { showModal, handleClose } = useShowModal("newTask");
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ defaultValues: initialValues });
  const { mutate } = useCreateTaskMutation({ reset, projectId, onSuccess: () => setIdempotencyKey(crypto.randomUUID()) });

  const handleCreateTask = (formData: TaskFormType) => {
    mutate({ formData, projectId, idempotencyKey });
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-200" onClose={handleClose}>

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
              {/* Wrapper de carpeta/archivo */}
              <div className="relative pt-7 w-full max-w-lg m-auto">
                {/* Pestaña tipo archivo — modo creación */}
                <div className="absolute top-0 left-6 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
                  <DocumentPlusIcon className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-mono text-xs text-slate-400">nueva-tarea.task</span>
                </div>

                <button
                  onClick={handleClose}
                  className="absolute top-1 right-0 cursor-pointer p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150 z-10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <DialogPanel className="relative overflow-hidden bg-[#0f1117] border border-zinc-800 rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">
                  
                  <DogEar />

                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                      Proyecto
                    </p>
                    <DialogTitle as="h3" className="text-xl font-bold text-slate-100 pr-6">
                      Nueva Tarea
                    </DialogTitle>
                    <p className="text-sm text-slate-400 mt-1">
                      Llena el formulario para crear una{" "}
                      <span className="text-indigo-400 font-medium">tarea</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-zinc-800 mb-6" />

                  {/* Form */}
                  <form noValidate onSubmit={handleSubmit(handleCreateTask)} className="space-y-6">

                    <TaskForm errors={errors} register={register} control={control} taskId={''} />

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md flex items-center justify-center gap-2"
                    >
                      <DocumentPlusIcon className="h-4 w-4" />
                      Guardar Tarea
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
}