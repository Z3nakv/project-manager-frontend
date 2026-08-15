import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'


type HorizontalScrollerProps = {
    children: React.ReactNode
    className?: string
}

const HorizontalScroller = ({ children, className }: HorizontalScrollerProps) => {
    const { scrollRef, scroll, canScrollLeft, canScrollRight } = useHorizontalScroll();
    return (
        <div className='relative'>
            
            <div className='md:hidden'>
                {canScrollLeft ? (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-12 -top-8 -translate-y-1/2 z-10 cursor-pointer p-2 bg-surface-elevated border border-border rounded-lg text-text-muted hover:text-text-primary transition-colors"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                ) : <div />}

                {canScrollRight ? (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-12 -top-8 -translate-y-1/2 z-10 cursor-pointer p-2 bg-surface-elevated border border-border rounded-lg text-text-muted hover:text-text-primary transition-colors"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                ) : <div />}
            </div>

            {/* Contenedor scrolleable */}
            <div
                ref={scrollRef}
                className={`overflow-x-auto w-full max-w-full px-6 3xl:p-0 @container
                    [&::-webkit-scrollbar]:h-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-border
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb:hover]:bg-border-strong
                    ${className || ''}`}
            >
                {children}
            </div>
        </div>
    )
}

export default HorizontalScroller