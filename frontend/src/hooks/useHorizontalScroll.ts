// hooks/useHorizontalScroll.ts
import { useRef, useState, useEffect } from 'react'

export const useHorizontalScroll = (columnWidthRatio = 0.85) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)

    useEffect(() => {
    const el = scrollRef.current
    if(!el) return

    const handleScroll = () => {
        setScrollPosition(el.scrollLeft)
        setMaxScroll(el.scrollWidth - el.offsetWidth)
    }

    const resizeObserver = new ResizeObserver(() => {
        setMaxScroll(el.scrollWidth - el.offsetWidth)
    })

    el.addEventListener('scroll', handleScroll)
    resizeObserver.observe(el)
    setMaxScroll(el.scrollWidth - el.offsetWidth)

    return () => {
        el.removeEventListener('scroll', handleScroll)
        resizeObserver.disconnect()
    }
}, [])

    const scroll = (direction: 'left' | 'right') => {
    if(scrollRef.current) {
        const columnWidth = window.innerWidth * columnWidthRatio + 16
        scrollRef.current.scrollBy({
            left: direction === 'right' ? columnWidth : -columnWidth,
            behavior: 'smooth'
        })
    }
}

    const canScrollLeft = scrollPosition > 0
    const canScrollRight = scrollPosition < maxScroll

    return { scrollRef, scroll, canScrollLeft, canScrollRight }
}