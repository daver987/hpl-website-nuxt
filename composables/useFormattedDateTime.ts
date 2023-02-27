import { isValid, format } from 'date-fns'
import { computed } from 'vue'

export function useFormattedDate(date: number | null | unknown) {
  return computed(() => {
    return isValid(new Date(date as any))
      ? format(new Date(date as number), 'MMMM dd, yyyy')
      : 'January 1, 2023'
  })
}

export function useFormattedTime(time: number | null) {
  return computed(() => {
    return isValid(new Date(time as any))
      ? format(new Date(time as number), 'hh:mm a')
      : '12:00 PM'
  })
}
