import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/20/solid";
import NotesPanel from "../../notes/NotesPanel";
import { useGetTaskData } from "../../../hooks/queries/useTaskQueries";
import TaskModalMainBody from "./TaskModalMainBody";
import useProjectId from "../../../hooks/useProjectId";
import useShowModal from "../../../hooks/useShowModal";
import DogEar from "../../DogEar";

const ViewTaskModal = () => {
  const projectId = useProjectId();

  const {
    queryValue: taskId,
    showModal,
    handleClose,
  } = useShowModal("viewTask");
  const {
    data: taskData,
    isError,
    error,
  } = useGetTaskData({ projectId, taskId });
  if (!showModal || !taskId) return null;
  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;

  if (taskData)
    return (
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-200" onClose={handleClose}>
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
                {/* Wrapper de carpeta/archivo */}
                <div className="relative pt-7 w-full max-w-sm md:max-w-3xl m-auto mt-30">
                  {/* Pestaña tipo archivo */}
                  <div className="absolute top-0 left-6 h-7 flex items-center gap-1.5 bg-[#0f1117] border border-zinc-800 border-b-0 rounded-t-md px-3.5">
                    <DocumentTextIcon className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="font-mono text-xs text-slate-400">
                      tarea.task
                    </span>
                  </div>

                  {/* Botón cerrar, alineado a la misma altura que la pestaña */}
                  <button
                    onClick={handleClose}
                    className="absolute top-1 right-0 cursor-pointer p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150 z-10"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>

                  <DialogPanel
                    className="relative md:grid md:grid-cols-2 md:gap-5
                    max-h-[80vh] scrollbar-thumb-indigo-50 scrollbar-auto
                    overflow-y-auto overflow-x-hidden bg-[#0f1117] border border-zinc-800
                    rounded-tl-sm rounded-tr-2xl rounded-b-2xl
                    shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8"
                  >
                    <DogEar/>

                    <TaskModalMainBody taskData={taskData} taskId={taskId} />
                    <NotesPanel notes={taskData.notes} />
                  </DialogPanel>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
};

export default React.memo(ViewTaskModal);
