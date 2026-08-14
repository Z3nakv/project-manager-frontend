export const getColor = (id: string) => {
    const colors = [
        'bg-primary-subtle text-accent',
        'bg-success-subtle text-success',
        'bg-warning-subtle text-warning',
        'bg-error-subtle text-error',
    ]
    const index = id.charCodeAt(0) % colors.length
    return colors[index]
}