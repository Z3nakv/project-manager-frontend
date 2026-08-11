// components/ui/DashboardSkeleton.tsx

const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-[#2d3348] rounded-lg ${className}`} />
)

const ProjectCardSkeleton = () => (
    <div className="bg-[#0f1117] border border-[#2d3348] rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-start">
            <SkeletonBlock className="h-5 w-40 rounded-md" />
            <SkeletonBlock className="h-5 w-5 rounded-md shrink-0" />
        </div>
        <SkeletonBlock className="h-3.5 w-24 rounded-md" />
        <SkeletonBlock className="h-3.5 w-full rounded-md" />
        <SkeletonBlock className="h-6 w-20 rounded-full" />
    </div>
)

const DashboardSkeleton = () => (
    <div className="ml-12 mr-8">
        {/* Header - centrado */}
        <div className="flex flex-col items-center gap-3 mb-10 text-center">
            <SkeletonBlock className="h-3 w-24 rounded-md" />
            <SkeletonBlock className="h-9 w-48 rounded-md" />
            <SkeletonBlock className="h-3.5 w-56 rounded-md" />
            <SkeletonBlock className="h-10 w-40 rounded-xl mt-2" />
        </div>

        {/* Section header */}
        <div className="flex justify-between items-center mb-4">
            <SkeletonBlock className="h-3 w-32 rounded-md" />
            <SkeletonBlock className="h-3 w-16 rounded-md" />
        </div>

        {/* Project cards - mismo grid que la vista real */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
        </div>
    </div>
)

export default DashboardSkeleton