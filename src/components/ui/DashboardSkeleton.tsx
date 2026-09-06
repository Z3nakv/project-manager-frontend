const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-surface-hover rounded-lg ${className}`} />
);

const ProjectCardSkeleton = () => (
  <div className="relative pt-4">
    <div className="absolute top-1 left-4 w-16 h-4 bg-bg border border-border-subtle border-b-0 rounded-t-md" />

    <div className="bg-surface-base border border-border-subtle rounded-tl-sm rounded-tr-2xl rounded-b-2xl p-3.5 shadow-soft">
      <div className="flex items-center justify-between mb-2.5">
        <SkeletonBlock className="h-5 w-5 rounded-md" />
        <SkeletonBlock className="h-5 w-5 rounded-md" />
      </div>

      <SkeletonBlock className="h-2.75 w-2/3 rounded-md mb-1.5" />
      <SkeletonBlock className="h-2.75 w-1/2 rounded-md mb-2" />
      <SkeletonBlock className="h-3 w-full rounded-md mb-1" />
      <SkeletonBlock className="h-3 w-5/6 rounded-md mb-3" />

      <div className="flex items-center justify-between mb-3">
        <SkeletonBlock className="h-6 w-20 rounded-md" />
        <SkeletonBlock className="h-6 w-24 rounded-md" />
      </div>

      <div className="border-t border-border-subtle pt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-4 w-4 rounded-md" />
          <SkeletonBlock className="h-4 w-4 rounded-md" />
          <SkeletonBlock className="h-4 w-4 rounded-md" />
        </div>
        <SkeletonBlock className="h-8 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="min-h-screen px-8 font-mono">
    <div className="flex flex-col items-center justify-between mb-10 mt-5">
      <div className="flex flex-col items-center">
        <SkeletonBlock className="h-3 w-16 rounded-md mb-1" />
        <SkeletonBlock className="h-9 w-48 rounded-md" />
        <SkeletonBlock className="h-3.5 w-56 rounded-md mt-1" />
      </div>
    </div>

    <div className="flex items-center justify-between mb-4 ml-6">
      <SkeletonBlock className="h-3.5 w-28 rounded-md" />
      <SkeletonBlock className="h-3.5 w-20 rounded-md" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  </div>
);

export default DashboardSkeleton;