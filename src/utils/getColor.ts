export const getColor = (id: string) => {
    const colors = [
        'bg-indigo-500/20 text-indigo-300',
        'bg-emerald-500/20 text-emerald-300',
        'bg-amber-500/20 text-amber-300',
        'bg-red-500/20 text-red-300',
    ]
    const index = id.charCodeAt(0) % colors.length
    return colors[index]
}