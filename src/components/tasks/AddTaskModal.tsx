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
          <div className="fixed inset-0 bg-overlay backdrop-blur-sm" />
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
                <div className="absolute top-0 left-6 h-7 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5">
                  <DocumentPlusIcon className="h-3.5 w-3.5 text-success" />
                  <span className="font-mono text-xs text-text-muted">nueva-tarea.task</span>
                </div>

                <button
                  onClick={handleClose}
                  className="absolute top-1 right-0 cursor-pointer p-1.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors duration-150 z-10"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <DialogPanel className="relative overflow-hidden bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-overlay p-8">
                  
                  <DogEar />

                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
                      Proyecto
                    </p>
                    <DialogTitle as="h3" className="text-xl font-bold text-text-primary pr-6">
                      Nueva Tarea
                    </DialogTitle>
                    <p className="text-sm text-text-secondary mt-1">
                      Llena el formulario para crear una{" "}
                      <span className="text-accent font-medium">tarea</span>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border-subtle mb-6" />

                  {/* Form */}
                  <form noValidate onSubmit={handleSubmit(handleCreateTask)} className="space-y-6">

                    <TaskForm errors={errors} register={register} control={control} taskId={''} />

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-text-on-primary text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors duration-150 shadow-md flex items-center justify-center gap-2"
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