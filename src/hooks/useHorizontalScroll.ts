import { useRef, useState, useEffect } from 'react'

export const useHorizontalScroll = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        
        const taskListRealSize = el.offsetWidth - el.getBoundingClientRect().x
        
        const handleScroll = () => {
            setScrollPosition(el.scrollLeft)
            setMaxScroll(el.scrollWidth - taskListRealSize)
        }

        const resizeObserver = new ResizeObserver(() => {
            setMaxScroll(el.scrollWidth - taskListRealSize)
        })

        el.addEventListener('scroll', handleScroll)
        resizeObserver.observe(el)

        handleScroll()

        return () => {
            el.removeEventListener('scroll', handleScroll)
            resizeObserver.disconnect()
        }
    }, [])

    const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return

    const firstColumn = el.querySelector<HTMLElement>('[data-scroll-column]')
    if (!firstColumn) return

    const track = el.querySelector<HTMLElement>('[data-scroll-track]')
    const gap = track ? parseFloat(window.getComputedStyle(track).columnGap) || 16 : 16

    const columnWidth = firstColumn.offsetWidth + gap

    el.scrollBy({
        left: direction === 'right' ? columnWidth : -columnWidth,
        behavior: 'smooth'
    })
}

    const SCROLL_THRESHOLD = 8
    const canScrollLeft = scrollPosition > SCROLL_THRESHOLD
    const canScrollRight = scrollPosition < maxScroll - SCROLL_THRESHOLD

    return { scrollRef, scroll, canScrollLeft, canScrollRight }
}