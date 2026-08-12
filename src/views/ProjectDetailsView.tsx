import { Navigate, Outlet, useSearchParams } from "react-router";
import { lazy, Suspense, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForbidden } from "../hooks/useForbidden";
import { QueryStateWrapper } from "../components/ui/QueryStateWrapper";
import ProjectDetailsViewHero from "../components/projects/ProjectDetailsViewHero";
import ProjectDetailsSkeleton from "../components/ui/ProjectDetailsSkeleton";
import useProjectId from "../hooks/useProjectId";
import { useGetProjectById } from "../hooks/queries/useProjectQueries";

const EditTaskData = lazy(() => import("../components/tasks/EditTaskData/EditTaskData"));
const ViewTaskModal = lazy(() => import("../components/tasks/ViewTaskModal/ViewTaskModal"));
const AddTaskModal = lazy(() => import("../components/tasks/AddTaskModal"));
const TaskAttachmentModal = lazy(() => import("../components/tasks/attachments/TaskAttachmentModal"));
const AssignMemberModal = lazy(() => import("../components/tasks/AssignMemberModal/AssignMemberModal"));
const RemovedFromProjectModal = lazy(() => import("../components/RemoveFromProjectModal"));
const SelectTaskPropsModal = lazy(() => import("../components/tasks/SelectTaskPropsModal"));
const AITaskSuggestions = lazy(() => import("../components/tasks/AITasksSuggestions").then(m => ({default: m.AITaskSuggestions})));

const ProjectDetailsView = () => {
  const { isLoading: authLoading} = useAuth();
  const projectId = useProjectId();
  const [, setSearchParams] = useSearchParams();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleTaskPropsConfirm = (fields: string[], quantity: number) => {
    setSelectedFields(fields);
    setQuantity(quantity);
    setSearchParams((prev) => {
      prev.delete("viewTaskProps");
      prev.set("viewSuggestions", "true");
      return prev;
    });
  };

  const { data: project, isError, isLoading, error, refetch } = useGetProjectById(projectId);
  /* const canEdit = useMemo(() => project?.manager._id.toString() === user?._id.toString(), [project, user]); */
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
          <div className="border-t border-[#2d3348] mt-6 mb-8 max-w-xs m-auto" />

          <Outlet/>
          
          {/* ── Modals ─────────────────────────────────────────── */}
          <Suspense fallback={null}><ViewTaskModal /></Suspense>
          <Suspense fallback={null}><AddTaskModal /></Suspense>
          <Suspense fallback={null}><EditTaskData /></Suspense>
          <Suspense fallback={null}><AssignMemberModal /></Suspense>
          <Suspense fallback={null}><SelectTaskPropsModal onConfirm={handleTaskPropsConfirm} /></Suspense>
          <Suspense fallback={null}><AITaskSuggestions projectId={projectId} selectedFields={selectedFields} quantity={quantity}/></Suspense>
          <Suspense fallback={null}><RemovedFromProjectModal show={isForbidden} /></Suspense>
          <Suspense fallback={null}><TaskAttachmentModal /></Suspense>
        </div>
      )}
    </QueryStateWrapper>
  );
};

export default ProjectDetailsView;
