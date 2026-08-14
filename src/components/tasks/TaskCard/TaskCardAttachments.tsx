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
  const { data: attachments, isLoading } = useTaskAttachments({ projectId, taskId });

  const handleNavigation = async (attachmentId: string, taskId: string) => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.get("viewTask")) {
      searchParams.set("task", taskId);
      searchParams.set("viewAttachment", attachmentId);
    } else {
      searchParams.set("viewAttachment", attachmentId);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (!isLoading && !attachments?.length) return null;

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
        Adjuntos {attachments?.length ? `· ${attachments.length}` : ""}
      </p>

      {isLoading ? (
        <AttachmentsSkeleton />
      ) : (
        <ul className="grid grid-cols-4 gap-2">
          {attachments?.map((att) => (
            <li key={att._id} className="relative">
              <button
                onClick={() => handleNavigation(att._id, att.task)}
                className="relative block w-full aspect-square rounded-lg overflow-hidden border border-border-subtle hover:border-primary/40 transition-colors group"
              >
                <img
                  src={att.url}
                  alt={att.filename}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-0 right-0 w-4 h-4 bg-surface-elevated group-hover:bg-primary/20 transition-colors"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskCardAttachments;