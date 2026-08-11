
const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-[#2d3348] rounded-lg ${className}`} />
)

const TaskCardSkeleton = () => (
    <li className="bg-[#0f1117] h-50 rounded-xl p-4 border border-[#2d3348] space-y-3 mx-10">
        <div className="flex justify-between items-start">
            <SkeletonBlock className="h-4 w-40 rounded-md" />
            <SkeletonBlock className="h-5 w-5 rounded-md shrink-0" />
        </div>
        <SkeletonBlock className="h-3 w-full rounded-md" />
        <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
                <SkeletonBlock className="h-3 w-3 rounded-sm shrink-0" />
                <SkeletonBlock className="h-3 w-28 rounded-md" />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <SkeletonBlock className="h-3 w-3 rounded-sm shrink-0" />
                    <SkeletonBlock className="h-3 w-28 rounded-md" />
                </div>
                <SkeletonBlock className="h-4 w-20 rounded-full" />
            </div>
        </div>
    </li>
)

const ColumnSkeleton = () => (
    <div className="w-[75vw] sm:w-72 2xl:w-auto 2xl:flex-1 flex flex-col shrink-0">
        {/* Drop zone */}
        <SkeletonBlock className="hidden h-10 w-full rounded-lg mb-3 border border-dashed border-[#2d3348] bg-transparent" />
        {/* Cards */}
        <ul className="flex flex-col gap-3">
            <TaskCardSkeleton />
            <TaskCardSkeleton />
        </ul>
    </div>
)

const columnColors = ['#6366f1', '#f59e0b', '#ef4444', '#0ea5e9', '#10b981']

const ProjectDetailsSkeleton = () => (
    <div className="ml-12 mr-10">
    <div className="min-h-screen bg-[#151921]">

        {/* Title block */}
        <div className="mb-5 space-y-2">
            <SkeletonBlock className="h-8 w-64 rounded-md" />
        </div>

        {/* Divider */}
        <div className="border-t border-[#2d3348] mb-8" />

        {/* Mobile arrows */}
        <div className="flex justify-between items-center mb-3 md:hidden">
            <SkeletonBlock className="h-9 w-9 rounded-lg" />
            <SkeletonBlock className="h-3 w-32 rounded-md" />
            <SkeletonBlock className="h-9 w-9 rounded-lg" />
        </div>

        {/* Columns */}
        <div className="flex gap-4">
            {columnColors.map(( i) => (
                <ColumnSkeleton key={i} />
            ))}
        </div>
    </div>
    </div>
)

export default ProjectDetailsSkeleton