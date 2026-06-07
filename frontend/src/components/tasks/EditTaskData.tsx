import EditTaskModal from "./EditTaskModal";
import { getProjectTaskByID } from "../../services/taskServices";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";

const EditTaskData = () => {
  const params = useParams();
  const projectID = params.projectID!;
  const location = useLocation();
  const taskID = new URLSearchParams(location.search).get("editTask")!;

  const { data, isError, error } = useQuery({
    queryKey: ["task", taskID],
    queryFn: () => getProjectTaskByID({ projectID, taskID }),
    enabled: !!taskID,
  });

  if (isError) return <p className="text-red-400 text-sm">{error.message}</p>;
  if (data) return <EditTaskModal data={data} taskID={taskID} />;
};

export default EditTaskData;