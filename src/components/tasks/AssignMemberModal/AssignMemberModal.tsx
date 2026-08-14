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
                                <DialogPanel className="w-full max-w-md bg-surface-elevated border border-border rounded-2xl shadow-overlay p-6">
    
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <DialogTitle as="h3" className="text-lg font-bold text-text-primary">
                                                Agregar Colaborador
                                            </DialogTitle>
                                            <p className="text-sm text-text-secondary mt-1">
                                                Busca al integrante por su email
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleClose}
                                            className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors duration-150 cursor-pointer"
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