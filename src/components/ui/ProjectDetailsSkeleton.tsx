
const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-surface-hover rounded-lg ${className}`} />
);

const TaskCardSkeleton = () => (
  <li className="bg-surface-base border border-border rounded-lg p-3 pt-2.5 space-y-2.5">
    <div className="flex justify-between items-start gap-2">
      <SkeletonBlock className="h-4 w-32 rounded-md" />
      <SkeletonBlock className="h-5 w-5 rounded-md shrink-0" />
    </div>

    <SkeletonBlock className="h-3 w-full rounded-md" />
    <SkeletonBlock className="h-3 w-4/5 rounded-md" />

    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <SkeletonBlock className="h-3 w-3 rounded-sm shrink-0" />
        <SkeletonBlock className="h-3 w-20 rounded-md" />
      </div>
      <SkeletonBlock className="h-4 w-16 rounded-full" />
    </div>

    <div className="h-2 w-full rounded-full bg-border animate-pulse" />
  </li>
);

const ColumnSkeleton = ({ colorClass }: { colorClass: string }) => (
  <div className="w-[85cqw] sm:w-72 2xl:w-auto 2xl:flex-1 2xl:min-w-72 flex flex-col shrink-0 snap-center">
    <div className="relative mt-2 flex justify-end items-center gap-2 font-mono text-sm">
      <div className="absolute left-0 flex gap-2 items-center bg-surface-base border border-border-subtle border-b-0 rounded-t-lg px-4 pt-1.5 pb-1">
        <span className={`w-3 h-3 rounded-full shrink-0 ${colorClass}`} />
        <SkeletonBlock className="h-3.5 w-20 rounded-md" />
      </div>
      <SkeletonBlock className="h-3 w-10 rounded-md" />
    </div>

    <div className="bg-surface-base border border-border rounded-b-lg rounded-tr-lg p-3 flex flex-col gap-2.5 min-h-30">
      <div className={`h-0.5 rounded-full mb-1 ${colorClass}`} />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
    </div>
  </div>
);

const columnColors = [
  "bg-status-pending",
  "bg-status-inprogress",
  "bg-status-onhold",
  "bg-status-underreview",
  "bg-status-completed",
];

const ProjectDetailsSkeleton = () => (
  <div className="min-h-screen bg-bg text-text-primary">
    <div className="flex gap-5 justify-around md:justify-normal px-4 md:px-0">
      <div className="md:flex md:w-full md:justify-around md:items-center">
        <div className="md:flex-col">
          <SkeletonBlock className="h-8 w-48 md:w-64 rounded-md" />
          <SkeletonBlock className="hidden md:block h-4 w-80 mt-2 rounded-md" />
        </div>
      </div>
    </div>

    <div className="border-t border-border mt-6 mb-8 max-w-xs m-auto" />

    <div className="bg-transparent">
      <div className="flex justify-between items-center mb-3 md:hidden">
        <div />
        <SkeletonBlock className="h-3 w-32 rounded-md" />
        <SkeletonBlock className="h-9 w-9 rounded-lg" />
      </div>

      <div className="flex gap-4 pb-4 justify-center-safe overflow-hidden">
        <div className="w-[7.5cqw] sm:w-0 shrink-0" aria-hidden="true" />
        {columnColors.map((colorClass, index) => (
          <ColumnSkeleton key={index} colorClass={colorClass} />
        ))}
        <div className="w-[7.5cqw] sm:w-0 shrink-0" aria-hidden="true" />
      </div>
    </div>
  </div>
);

export default ProjectDetailsSkeleton;