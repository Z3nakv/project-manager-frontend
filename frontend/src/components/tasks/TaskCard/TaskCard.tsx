import { useDraggable } from "@dnd-kit/react";
import TaskColorLabels from "./TaskColorLabels";
import TaskNotes from "./TaskNotes";
import TaskDeadLine from "./TaskDeadLine";
import TaskCreatedAt from "./TaskCreatedAt";
import TaskCardAttachments from "./TaskCardAttachments";
import AssignTaskMembers from "./AssignTaskMembers";
import type { TaskProjectType } from "../../../types/task";
import { lazy } from "react";
import { useAuth } from "../../../hooks/useAuth";

type TaskCardProps = {
  task: TaskProjectType;
  canEdit: boolean;
  isMobile: boolean;
};

const TaskMenuItems = lazy(
    () => import("./TaskMenuItems")
);

const TaskCard = ({ task, canEdit, isMobile }: TaskCardProps) => {
  const currentUser = useAuth();
  const { ref } = useDraggable({ id: task._id, disabled: isMobile });
  const isAssignedToMe = task.assignedTo?.some(user => user._id === currentUser.data?._id)
  
  return (
    <li
      ref={ref}
      className={`bg-[#1e2330] rounded-xl p-4 border 
      border-[#2d3348] cursor-grab active:cursor-grabbing shadow-md 
      hover:-translate-y-1 transition-transform duration-150
      ${isAssignedToMe ? 'border-indigo-500' : 'border-transparent'}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-base font-semibold text-slate-200 leading-snug flex-1">
          {task.name}
        </span>

        <TaskMenuItems canEdit={canEdit} taskID={task._id}/>
      </div>

      {/* Descripción */}
      <p className="text-[13px] text-slate-400 leading-relaxed mb-3">
        {task.description}
      </p>

      <TaskCardAttachments taskID={task._id} />

      {/* Etiquetas */}
      <TaskColorLabels taskLabels={task.labels} />

      {/* Fechas */}
      <div className="flex flex-col gap-1.5 mb-3">
        {/* Fecha de creación */}
        <TaskCreatedAt taskCreatedAt={task.createdAt} />

        {/* Fecha límite */}
        <TaskDeadLine taskDeadline={task.deadline}/>
      </div>

      {/* Notas */}
      <TaskNotes taskNotes={task.notes}/>

      <AssignTaskMembers AssignedMembers={task.assignedTo!} />
    </li>
  );
};

export default TaskCard;
