import type { TaskProjectType } from "../../../types";
import { useDraggable } from "@dnd-kit/react";
import TaskColorLabels from "./TaskColorLabels";
import TaskNotes from "./TaskNotes";
import TaskDeadLine from "./TaskDeadLine";
import TaskCreatedAt from "./TaskCreatedAt";
import TaskMenuItems from "./TaskMenuItems";
import TaskCardAttachments from "./TaskCardAttachments";
import AssignTaskMembers from "./AssignTaskMembers";

type TaskCardProps = {
  task: TaskProjectType;
  canEdit: boolean;
  isMobile: boolean;
};

const TaskCard = ({ task, canEdit, isMobile }: TaskCardProps) => {
  
  const { ref } = useDraggable({ id: task._id, disabled: isMobile });
  
  return (
    <li
      ref={ref}
      className="bg-[#1e2330] rounded-xl p-4 border border-[#2d3348] cursor-grab active:cursor-grabbing shadow-md hover:-translate-y-1 transition-transform duration-150"
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

      <AssignTaskMembers AssignedMembers={task.assignedTo} />
    </li>
  );
};

export default TaskCard;
