export function formatDate(isoString: string): string {
  if (!isoString) return ''

  const date = new Date(isoString)
  const currentYear = new Date().getFullYear()
  const dateYear = date.getUTCFullYear()

  const day = date.getUTCDate()
  const month = new Intl.DateTimeFormat('es-ES', { month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace('.', '') // Intl a veces agrega punto: "jul." → "jul"

  return dateYear === currentYear ? `${day}-${month}` : `${day}-${month}-${dateYear}`
}