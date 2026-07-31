import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import NotesPanel from "../../notes/NotesPanel";
import { useGetTaskData } from "../../../hooks/queries/useTaskQueries";
import TaskModalMainBody from "./TaskModalMainBody";
import useProjectId from "../../../hooks/useProjectId";
import useShowModal from "../../../hooks/useShowModal";

const ViewTaskModal = () => {
  const projectId = useProjectId();
  
  const { queryValue: taskId, showModal, handleClose } = useShowModal("viewTask");
  const {data: taskData, isError, error,} = useGetTaskData({ projectId, taskId });
  if (!showModal || !taskId) return null;
  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;
  
  
  if (taskData)
    return (
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={handleClose}>
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
                <DialogPanel
                  className="md:grid md:grid-cols-2 md:gap-5 w-full md:max-w-3xl 
                max-w-md max-h-[80vh] mt-30 scrollbar-thumb-indigo-50 scrollbar-auto 
                overflow-y-auto bg-[#1e2330] border border-[#2d3348] rounded-xl 
                shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8"
                >
                  <TaskModalMainBody
                    taskData={taskData}
                    handleClose={handleClose}
                    taskId={taskId}
                  />
                  <NotesPanel notes={taskData.notes} />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
};

export default React.memo(ViewTaskModal);
