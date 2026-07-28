import { useParams } from "react-router";

const useTaskId = () => {
  const { taskId } = useParams<{ taskId: string }>();
  return taskId ?? null;
}

export default useTaskId