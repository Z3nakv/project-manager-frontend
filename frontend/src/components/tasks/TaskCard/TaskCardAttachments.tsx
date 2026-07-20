import { useLocation, useNavigate, useParams } from "react-router";
import { useTaskAttachments } from "../../../hooks/queries/useAttachmentsQueries";
import type { Task } from "../../../types/task";

type TaskCardAttachmentsProps = {
  taskID: Task["_id"];
};

const TaskCardAttachments = ({ taskID }: TaskCardAttachmentsProps) => {
  const params = useParams();
  const projectID = params.projectID!;
  const navigate = useNavigate();
  const location = useLocation();
  const { data: attachments, isLoading } = useTaskAttachments({
    projectID,
    taskID,
  });

  const handleNavigation = async (attachmentID : string, taskID : string) => {
    const searchParams =  new URLSearchParams(location.search)
    if(!searchParams.get("viewTask")) {
      searchParams.set("task", taskID);
      searchParams.set("viewAttachment", attachmentID);
    }else {
      searchParams.set("viewAttachment", attachmentID);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

  return (
    <div className="my-3">
      {isLoading ? (
        <p>Cargando attachments...</p>
      ) : (
        <ul className="grid grid-cols-4 gap-2">
          {attachments?.map((att) => (
            <li key={att._id}>
              <button
                onClick={() => handleNavigation(att._id, att.task)}>
                <img src={att.url} alt={att.filename} className="rounded" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskCardAttachments;
