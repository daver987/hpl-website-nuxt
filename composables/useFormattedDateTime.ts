import { format } from 'date-fns'

export function useFormattedDate(timestamp: number | Date | null): string {
  if (!timestamp) {
    return ''
  }
  const date = new Date(timestamp)
  return format(date, 'MMMM dd, yyyy')
}

export function useFormattedTime(timestamp: number | null): string {
  if (!timestamp) {
    return ''
  }
  const date = new Date(timestamp)
  return format(date, 'hh:mm a')
}
