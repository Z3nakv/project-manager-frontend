import { useUpdateTaskStatusMutation } from "../../../hooks/mutations/useTaskMutations";
import useProjectId from "../../../hooks/useProjectId";
import type { Task, TaskStatus } from "../../../types/task";
import TaskCardAttachments from "../TaskCard/TaskCardAttachments";
import ActivityLog from "./ActivityLog";
import StatusSelector from "./StatusSelector";
import TimeStamps from "./TimeStamps";
import ViewTaskModalHeader from "./ViewTaskModalHeader";

type TaskModalMainBodyProps = {
    taskData: Task
    taskId: string
}

const TaskModalMainBody = ( {taskData, taskId}: TaskModalMainBodyProps ) => {
  const projectId = useProjectId();
  const { mutate } = useUpdateTaskStatusMutation({ projectId });
  const handleUpdateStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    mutate({ projectId, taskId, status });
  };
  
  return (
    <div>

      <ViewTaskModalHeader taskData={taskData} />

      {/* Timestamps */}
      <TimeStamps taskData={taskData} />

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

      <StatusSelector
        taskData={taskData}
        handleUpdateStatus={handleUpdateStatus}
      />
      <TaskCardAttachments taskId={taskId} />
      <ActivityLog taskData={taskData} />
    </div>
  );
};

export default TaskModalMainBody;
