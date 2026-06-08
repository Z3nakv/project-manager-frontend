export function formatDate(isoString: string) : string {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    })
    return formatter.format(date);
}