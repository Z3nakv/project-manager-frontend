import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime"
import AssignMembersForm from "./AssignMembersForm";
import { useQueryClient } from "@tanstack/react-query";
import type { ProjectItemSchemaDetailsType } from "../../../types/project";
import useProjectId from "../../../hooks/useProjectId";

const AssignMemberModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const projectId = useProjectId();
    const queryClient = useQueryClient();
    const project = queryClient.getQueryData<ProjectItemSchemaDetailsType>(['project', projectId])!;
    const taskId = new URLSearchParams(location.search).get("viewAssignMember")!;
    const show = !!taskId;
    const handleClose = () => navigate(location.pathname, { replace: true });
    const task = project.tasks.find(task => task._id === taskId)!;
    if (!task) return null;
    const taskTeam = task.assignedTo!.map(task => task._id) ?? [];
    const projectTeam = project.team;

  return (
    <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleClose}>
    
                    {/* Overlay */}
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
                                <DialogPanel className="w-full max-w-md bg-[#1e2330] border border-[#2d3348] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] p-6">
    
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <DialogTitle as="h3" className="text-lg font-bold text-slate-100">
                                                Agregar Colaborador
                                            </DialogTitle>
                                            <p className="text-sm text-slate-400 mt-1">
                                                Busca al integrante por su email
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleClose}
                                            className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-[#2d3348] transition-colors duration-150"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    </div>
    
                                    <AssignMembersForm projectTeam ={projectTeam} taskTeam={taskTeam} taskId={taskId} projectId={projectId} />
    
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
  )
}

export default AssignMemberModal