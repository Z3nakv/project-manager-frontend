import type { Task } from "../../../../types/task";
import { getDeadlineStatus } from "../taskCard.config";
import DeadlineStatusLabel from "./DeadlineStatusLabel";
import TaskCreatedAt from "./TaskCreatedAt";
import TaskDeadLine from "./TaskDeadLine";

type TaskCreatedAtAndDeadlineProps = {
  createdAt: Task["createdAt"];
  deadline: Task["deadline"];
};

const TaskCreatedAtAndDeadline = ({
  createdAt,
  deadline,
}: TaskCreatedAtAndDeadlineProps) => {
  const deadlineStatus = getDeadlineStatus(deadline!)!;
    return (
      <div className="flex justify-between gap-1.5">
        <div className="flex gap-2">
          <TaskCreatedAt taskCreatedAt={createdAt} />
          <TaskDeadLine taskDeadline={deadline} />
        </div>
        <DeadlineStatusLabel deadlineStatus={deadlineStatus} />
      </div>
    );
};

export default TaskCreatedAtAndDeadline;
