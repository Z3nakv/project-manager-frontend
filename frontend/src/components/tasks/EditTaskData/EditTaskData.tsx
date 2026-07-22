import { useLocation, useParams } from "react-router";
import EditTaskModal from "./EditTaskModal";
import { useGetTaskData } from "../../../hooks/queries/useTaskQueries";

const EditTaskData = () => {
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const taskId = new URLSearchParams(location.search).get("editTask")!;

  const { data: taskData, isError, error } = useGetTaskData({ projectId, taskId })
  
  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;
  if (taskData) return <EditTaskModal taskData={taskData} taskId={taskId} />;
};

export default EditTaskData;