// components/ui/ProjectTeamSkeleton.tsx

const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-[#2d3348] rounded-lg ${className}`} />
)

const MemberRowSkeleton = () => (
    <li className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#2d3348]">
        <div className="flex items-center gap-3">
            <SkeletonBlock className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0" />
            <div className="space-y-2">
                <SkeletonBlock className="h-3.5 w-32 rounded-md" />
                <SkeletonBlock className="h-3 w-44 rounded-md" />
            </div>
        </div>
        <SkeletonBlock className="w-6 h-6 rounded-md shrink-0" />
    </li>
)

const ProjectTeamSkeleton = () => (
    <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
                <SkeletonBlock className="h-3 w-16 rounded-md" />
                <SkeletonBlock className="h-8 w-52 rounded-md" />
                <SkeletonBlock className="h-3.5 w-64 rounded-md" />
            </div>
            <div className="flex gap-3">
                <SkeletonBlock className="h-10 flex-1 sm:w-28 rounded-xl" />
                <SkeletonBlock className="h-10 flex-1 sm:w-24 rounded-xl" />
            </div>
        </div>

        {/* Team list */}
        <div className="bg-[#1e2330] border border-[#2d3348] rounded-2xl overflow-hidden">
            {/* List header */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-4 border-b border-[#2d3348]">
                <SkeletonBlock className="h-4 w-4 rounded-md" />
                <SkeletonBlock className="h-3 w-32 rounded-md" />
                <SkeletonBlock className="h-3 w-16 rounded-md ml-auto" />
            </div>

            {/* Members */}
            <ul>
                <MemberRowSkeleton />
                <MemberRowSkeleton />
                <MemberRowSkeleton />
            </ul>
        </div>
    </div>
)

export default ProjectTeamSkeleton