const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-surface-hover rounded-lg ${className}`} />
);

const MemberRowSkeleton = () => (
  <li className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border-subtle">
    <div className="flex items-center gap-3">
      <SkeletonBlock className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0" />
      <div className="space-y-2">
        <SkeletonBlock className="h-3.5 w-32 rounded-md" />
        <SkeletonBlock className="h-3 w-44 rounded-md" />
      </div>
    </div>
    <SkeletonBlock className="w-6 h-6 rounded-md shrink-0" />
  </li>
);

const ProjectTeamSkeleton = () => (
  <div className="max-w-sm mx-auto">
    <div className="flex flex-col gap-4 mb-8 items-center justify-between">
      <div>
        <SkeletonBlock className="h-3 w-16 rounded-md mb-1" />
        <SkeletonBlock className="h-8 w-52 rounded-md" />
        <SkeletonBlock className="h-3.5 w-64 rounded-md mt-1" />
      </div>

      <div className="flex gap-3 w-full">
        <SkeletonBlock className="h-10 flex-1 sm:flex-none sm:w-28 rounded-xl" />
        <SkeletonBlock className="h-10 flex-1 sm:flex-none sm:w-24 rounded-xl" />
      </div>
    </div>

    <div className="relative pt-4 w-full max-w-3xl mx-auto px-4 sm:px-0">
      <div className="absolute top-0 left-8 sm:left-5 flex items-center gap-1.5 bg-bg border border-border-subtle border-b-0 rounded-t-md px-3.5 pt-1.5 pb-1">
        <SkeletonBlock className="h-3.5 w-3.5 rounded-md" />
        <SkeletonBlock className="h-3 w-28 rounded-md" />
      </div>

      <div className="bg-surface-base border border-border rounded-tl-sm rounded-tr-2xl rounded-b-2xl shadow-lifted overflow-hidden">
        <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-border-subtle">
          <SkeletonBlock className="h-3 w-16 rounded-md ml-auto" />
        </div>

        <ul>
          <MemberRowSkeleton />
          <MemberRowSkeleton />
          <MemberRowSkeleton />
        </ul>
      </div>
    </div>
  </div>
);

export default ProjectTeamSkeleton;