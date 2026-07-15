import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router";
import type { TaskStatus } from "../../../types";
import NotesPanel from "../../notes/NotesPanel";
import { useUpdateTaskStatusMutation } from "../../../hooks/mutations/useTaskMutatios";
import ActivityLog from "./ActivityLog";
import StatusSelector from "./StatusSelector";
import ViewTaskModalHeader from "./ViewTaskModalHeader";
import TimeStamps from "./TimeStamps";
import { handleTeamMembers } from "./ViewTaskModal.config";
import { useGetTaskData } from "../../../hooks/queries/useTaskQueries";

const ViewTaskModal = () => {
  const params = useParams();
  const projectID = params.projectID!;
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const taskID = queryParams.get("viewTask")!;
  const show = !!taskID;

  const { data: taskData, isError, error } = useGetTaskData({ projectID, taskID })

  const team = handleTeamMembers({taskData});
  
  const { mutate } = useUpdateTaskStatusMutation({ projectID, team });

  const handleUpdateStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    mutate({ projectID, taskID, status });
  };

  const handleClose = () => navigate(location.pathname, { replace: true });

  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;

  if (taskData)
    return (
      <Transition appear show={show} as={Fragment}>
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
                <DialogPanel className="w-full max-w-lg bg-[#1e2330] border border-[#2d3348] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-8">
                  {/* Header */}
                  <ViewTaskModalHeader
                    taskData={taskData}
                    handleClose={handleClose}
                  />

                  {/* Timestamps */}
                  <TimeStamps taskData={taskData}/>

                  {/* Divider */}
                  <div className="border-t border-[#2d3348] mb-5" />

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      Descripción
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {taskData.description}
                    </p>
                  </div>

                  <ActivityLog taskData={taskData} />

                  <StatusSelector
                    taskData={taskData}
                    handleUpdateStatus={handleUpdateStatus}
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

export default ViewTaskModal;
