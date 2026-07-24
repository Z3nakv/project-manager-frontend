import { Navigate, useParams, useSearchParams } from "react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { getProjectById } from "../services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useForbidden } from "../hooks/useForbidden";
import { QueryStateWrapper } from "../components/ui/QueryStateWrapper";
import ProjectDetailsViewHero from "../components/projects/ProjectDetailsViewHero";
import ProjectDetailsSkeleton from "../components/ui/ProjectDetailsSkeleton";
import TaskList from "../components/tasks/TaskList";
import TaskListSkeleton from "../components/TaskListSkeleton";

const EditTaskData = lazy(() => import("../components/tasks/EditTaskData/EditTaskData"));
const ViewTaskModal = lazy(() => import("../components/tasks/ViewTaskModal/ViewTaskModal"));
const AddTaskModal = lazy(() => import("../components/tasks/AddTaskModal"));
const TaskAttachmentModal = lazy(() => import("../components/tasks/attachments/TaskAttachmentModal"));
const AssignMemberModal = lazy(() => import("../components/tasks/AssignMemberModal/AssignMemberModal"));
const RemovedFromProjectModal = lazy(() => import("../components/RemoveFromProjectModal"));
const SelectTaskPropsModal = lazy(() => import("../components/tasks/SelectTaskPropsModal"));
const AITaskSuggestions = lazy(() => import("../components/tasks/AITasksSuggestions").then(m => ({default: m.AITaskSuggestions})));

const ProjectDetailsView = () => {
  const { data: user, isLoading: authLoading} = useAuth();
  const [, setSearchParams] = useSearchParams();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const projectId = params.projectId!;

  const handleTaskPropsConfirm = (fields: string[], quantity: number) => {
    setSelectedFields(fields);
    setQuantity(quantity);
    setSearchParams((prev) => {
      prev.delete("viewTaskProps");
      prev.set("viewSuggestions", "true");
      return prev;
    });
  };

  const { data: project, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById({ projectId }),
    retry: false
  });

  const canEdit = useMemo(() => project?.manager._id.toString() === user?._id.toString(), [project, user]);
  const team = project ? [...new Set([...project!.team.map((member) => member._id), project?.manager._id])!] : [];
  const { isForbidden } = useForbidden();
  if (isError) return <Navigate to={"/404"} />;
  return (
    <QueryStateWrapper
      isLoading={isLoading || authLoading}
      isError={false}
      error={error}
      onRetry={() => refetch()}
      skeleton={<ProjectDetailsSkeleton />}
    >
      {project && (
        <div className="min-h-screen bg-[#151921]">
          <ProjectDetailsViewHero projectName={project.projectName} description={project.description} />
          <div className="border-t border-[#2d3348] mt-6 mb-8" />

          <Suspense fallback={<TaskListSkeleton/>}>
            <TaskList tasks={project.tasks} canEdit={canEdit} team={team} />
          </Suspense>
          
          {/* ── Modals ─────────────────────────────────────────── */}
          <Suspense fallback={null}><ViewTaskModal /></Suspense>
          <Suspense fallback={null}><AddTaskModal /></Suspense>
          <Suspense fallback={null}><EditTaskData /></Suspense>
          <Suspense fallback={null}><AssignMemberModal /></Suspense>
          <Suspense fallback={null}><SelectTaskPropsModal onConfirm={handleTaskPropsConfirm} /></Suspense>
          <Suspense fallback={null}>
            <AITaskSuggestions 
            projectId={projectId} selectedFields={selectedFields} quantity={quantity}/>
          </Suspense>
          <Suspense fallback={null}><RemovedFromProjectModal show={isForbidden} /></Suspense>
          <Suspense fallback={null}><TaskAttachmentModal /></Suspense>
        </div>
      )}
    </QueryStateWrapper>
  );
};

export default ProjectDetailsView;
