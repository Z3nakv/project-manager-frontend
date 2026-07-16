import { useLocation, useParams } from "react-router";
import EditTaskModal from "./EditTaskModal";
import { useGetTaskData } from "../../../hooks/queries/useTaskQueries";

const EditTaskData = () => {
  const params = useParams();
  const projectID = params.projectID!;
  const location = useLocation();
  const taskID = new URLSearchParams(location.search).get("editTask")!;

  const { data: taskData, isError, error } = useGetTaskData({ projectID, taskID })
  
  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;
  if (taskData) return <EditTaskModal taskData={taskData} taskID={taskID} />;
};

export default EditTaskData;