import { useEffect, useState } from 'react'

export const useForbidden = () => {
    const [isForbidden, setIsForbidden] = useState(false)

    useEffect(() => {
        const handleForbidden = () => setIsForbidden(true)
        window.addEventListener('forbidden', handleForbidden)
        return () => window.removeEventListener('forbidden', handleForbidden)
    }, [])

    return { isForbidden };
}