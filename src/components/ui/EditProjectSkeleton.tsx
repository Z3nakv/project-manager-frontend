const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-surface-hover rounded-lg ${className}`} />
);

const EditProjectSkeleton = () => (
  <div className="max-w-3xl mx-auto px-4">
    <div className="flex items-start justify-between mb-8">
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-20 rounded-md" />
        <SkeletonBlock className="h-8 w-48 rounded-md" />
        <div className="flex items-center gap-1.5">
          <SkeletonBlock className="h-3.5 w-36 rounded-md" />
          <SkeletonBlock className="h-3.5 w-28 rounded-md" />
        </div>
      </div>
      <SkeletonBlock className="h-10 w-24 rounded-xl shrink-0" />
    </div>

    <div className="bg-surface-base border border-border rounded-xl p-8 space-y-6">
      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-36 rounded-md" />
        <SkeletonBlock className="h-10 w-full rounded-lg" />
      </div>

      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-32 rounded-md" />
        <SkeletonBlock className="h-10 w-full rounded-lg" />
      </div>

      <div className="space-y-2">
        <SkeletonBlock className="h-3 w-24 rounded-md" />
        <SkeletonBlock className="h-28 w-full rounded-lg" />
      </div>

      <SkeletonBlock className="h-11 w-full rounded-xl" />
    </div>
  </div>
);

export default EditProjectSkeleton;