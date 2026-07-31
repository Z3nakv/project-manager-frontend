import { useDraggable } from "@dnd-kit/react";
import TaskColorLabels from "./TaskColorLabels";
import TaskNotes from "./TaskNotes";
import TaskCardAttachments from "./TaskCardAttachments";
import AssignTaskMembers from "./AssignTaskMembers";
import type { TaskProjectType } from "../../../types/task";
import { useAuth } from "../../../hooks/useAuth";
import TaskHeader from "./TaskHeader/TaskHeader";
import TaskCreatedAtAndDeadline from "./TaskCreatedAtAndDeadline/TaskCreatedAtAndDeadline";
import React from "react";

type TaskCardProps = {
  task: TaskProjectType;
  canEdit: boolean;
  isMobile: boolean;
};

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
      ${isAssignedToMe ? 'border-indigo-500' : 'border-transparent'}`}>
      <TaskHeader taskName={task.name} taskDescription={task.description} taskId={task._id} canEdit={canEdit}/>
      <TaskCardAttachments taskId={task._id} />
      <TaskColorLabels taskLabels={task.labels} />
      <TaskCreatedAtAndDeadline createdAt={task.createdAt} deadline={task.deadline} />
      <TaskNotes taskNotes={task.notes}/>
      <AssignTaskMembers AssignedMembers={task.assignedTo!} />
    </li>
  );
};

export default React.memo(TaskCard);
