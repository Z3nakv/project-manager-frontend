import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectTaskByID, updateStatus } from "../../services/taskServices";
import type { TaskStatus } from "../../types";
import { XMarkIcon } from "@heroicons/react/20/solid";
import NotesPanel from "./notes/NotesPanel";
import { formatDate } from "../../utils";
import { toast } from "react-toastify";
import { socket } from "../../lib/socket";
import { useAuth } from "../../hooks/useAuth";
import { type projectItemDetailsType } from "../../types";

const statusTranslations: { [key: string]: string } = {
  pending:     "Pendiente",
  inProgress:  "En Progreso",
  onHold:      "En Espera",
  underReview: "Bajo Revisión",
  completed:   "Completado",
};

const statusColors: { [key: string]: string } = {
  pending:     "bg-slate-500/20 text-slate-400 border-slate-500/30",
  inProgress:  "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  onHold:      "bg-amber-500/20  text-amber-400  border-amber-500/30",
  underReview: "bg-sky-500/20    text-sky-400    border-sky-500/30",
  completed:   "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const ViewTaskModal = () => {
  const params   = useParams();
  const projectID = params.projectID!;
  const location  = useLocation();
  const navigate  = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const taskID      = queryParams.get("viewTask")!;
  const show        = !!taskID;

  const { data, isError, error } = useQuery({
    queryKey: ["task", taskID],
    queryFn:  () => getProjectTaskByID({ projectID, taskID }),
    enabled:  !!taskID,
  });

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey: ['project', projectID]});
      queryClient.invalidateQueries({ queryKey: ["task", taskID] });

      socket.emit("task_status_update", {
              message: `${user?.name} ha actualizado la tarea "${data.task?.name}"`,
              taskID,
              status,
              projectID,
              team: data.project.team.map((member : projectItemDetailsType['team']) => member),
              triggeredBy: user?._id
            });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleUpdateStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    mutate({ projectID, taskID, status });
  };

  const handleClose = () => navigate(location.pathname, { replace: true });

  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;
  
  if (data) return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={handleClose}>

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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[data.status]}`}>
                        {statusTranslations[data.status]}
                      </span>
                    </div>
                    <DialogTitle as="h3" className="text-xl font-bold text-slate-100 wrap-break-words">
                      {data.name}
                    </DialogTitle>
                  </div>

                  <button
                    onClick={handleClose}
                    className="ml-4 p-1.5 rounded-lg text-slate-400 hover:bg-[#2d3348] hover:text-slate-200 transition-colors duration-150 shrink-0"
                  >
                    <XMarkIcon className="cursor-pointer h-5 w-5" />
                  </button>
                </div>

                {/* Timestamps */}
                <div className="flex gap-4 mb-5">
                  <p className="text-xs text-slate-500">
                    Agregada el: {formatDate(data.createdAt)}
                    <span className="text-slate-400 ml-1">—</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Actualizada: {formatDate(data.updatedAt)}
                    <span className="text-slate-400 ml-1">—</span>
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-[#2d3348] mb-5" />

                {/* Description */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    Descripción
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {data.description}
                  </p>
                </div>

                
                  {data.completedBy.length ? (
                      <div className="space-y-4">
                        <p className="font-bold text-2xl text-slate-600 my-5">
                          Historial de cambios
                        </p>

                        <ul className="relative border-l-2 border-slate-300 max-h-48 overflow-y-auto
                                      [&::-webkit-scrollbar]:w-1.5
                                      [&::-webkit-scrollbar-track]:bg-transparent
                                      [&::-webkit-scrollbar-thumb]:bg-[#2d3348]
                                      [&::-webkit-scrollbar-thumb]:rounded-full
                                      [&::-webkit-scrollbar-thumb:hover]:bg-[#3d4663]">
                          {data.completedBy.map((activityLog, index) => (
                            <li key={activityLog._id} className="mb-6 ml-13">
                              <div className="absolute left-3 w-6 h-6 bg-slate-500 rounded-full border-4 border-white flex items-center justify-center">
                                <span className="text-xs text-white">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="font-bold text-slate-600">
                                  {statusTranslations[activityLog.status]}
                                </span>{" "}
                                <span className="text-slate-500">por : </span>{" "}
                                <span className="text-slate-500 font-black">
                                  {activityLog.user.name}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                {/* Status selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Cambiar estado
                  </label>
                  <select
                    className="w-full bg-[#151921] border border-[#2d3348] text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors duration-150 cursor-pointer"
                    defaultValue={data.status}
                    onChange={handleUpdateStatus}
                  >
                    {Object.entries(statusTranslations).map(([key, value]) => (
                      <option key={key} value={key} className="bg-[#1e2330]">
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                {<NotesPanel notes={data.notes} />}

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>

      </Dialog>
    </Transition>
  );
};

export default ViewTaskModal;