import { useLocation, useNavigate } from "react-router";
import { useTaskAttachments } from "../../../hooks/queries/useAttachmentsQueries";
import type { Task } from "../../../types/task";
import AttachmentsSkeleton from "../../ui/AttachmentsSkeleton";
import useProjectId from "../../../hooks/useProjectId";

type TaskCardAttachmentsProps = {
  taskId: Task["_id"];
};

const TaskCardAttachments = ({ taskId }: TaskCardAttachmentsProps) => {
  const projectId = useProjectId();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: attachments, isLoading } = useTaskAttachments({projectId,taskId});

  const handleNavigation = async (attachmentId : string, taskId : string) => {
    const searchParams =  new URLSearchParams(location.search)
    if(!searchParams.get("viewTask")) {
      searchParams.set("task", taskId);
      searchParams.set("viewAttachment", attachmentId);
    }else {
      searchParams.set("viewAttachment", attachmentId);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }

  return (
    <div className="my-3">
      {isLoading ? (
        <AttachmentsSkeleton />
      ) : (
        <ul className="grid grid-cols-4 gap-2">
          {attachments?.map((att) => (
            <li key={att._id}>
              <button
                onClick={() => handleNavigation(att._id, att.task)}>
                <img 
                src={att.url} 
                alt={att.filename} 
                loading="lazy"
                className="rounded"
                decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskCardAttachments;
