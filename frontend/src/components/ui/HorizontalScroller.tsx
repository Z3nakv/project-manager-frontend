// components/HorizontalScroller.tsx
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'


type HorizontalScrollerProps = {
    children: React.ReactNode
    className?: string
}

const HorizontalScroller = ({ children, className }: HorizontalScrollerProps) => {
    const { scrollRef, scroll, canScrollLeft, canScrollRight } = useHorizontalScroll()

    return (
        <div>
            {/* Flechas - solo en mobile */}
            {/* <div className="flex justify-between items-center mb-3 md:hidden"> */}
            <div className='relative md:hidden'>
                {canScrollLeft ? (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 -top-8 -translate-y-1/2 z-10 cursor-pointer p-2 bg-[#1e2330] border border-[#2d3348] rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                ) : <div />}

                {/* <span className="text-xs text-slate-500">Desliza para ver más</span> */}

                {canScrollRight ? (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 -top-8 -translate-y-1/2 z-10 cursor-pointer p-2 bg-[#1e2330] border border-[#2d3348] rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                ) : <div />}
            </div>

            {/* Contenedor scrolleable */}
            <div
                ref={scrollRef}
                className={`overflow-x-auto -mx-6 px-6
                    [&::-webkit-scrollbar]:h-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-[#2d3348]
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb:hover]:bg-[#3d4663]
                    ${className || ''}`}
            >
                {children}
            </div>
        </div>
    )
}

export default HorizontalScroller