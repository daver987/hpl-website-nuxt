import { format } from 'date-fns'
import { dateValidator } from './formatDateTime'

export const formatDateNew = (date: string): string => {
  return format(new Date(dateValidator(date)), 'MMMM dd, yyyy')
}

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMMM dd, yyyy')
}
