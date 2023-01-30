import { format, isValid, isMatch, parse } from 'date-fns'

export const formatDateTime = (date: string) => {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm a')
}

function fixDateString(date: string) {
  const dateParts = date.split('-')
  return [dateParts[2], dateParts[1], dateParts[0]].join('-')
}

export const dateValidator = (dateString: string) => {
  const isOldFormat = isMatch(dateString, 'dd-MM-yyyy')
  if (isOldFormat) {
    const fixedDate = fixDateString(dateString)
    const newFormattedDate = parse(fixedDate, 'yyyy-MM-dd', new Date())
    return format(newFormattedDate, 'MMMM dd, yyyy')
  } else if (isValid(new Date(dateString))) {
    return formatDate(dateString)
  } else {
    return dateString
  }
}
const timeValidator = (timeString: string) => {
  if (isValid(new Date(timeString))) {
    return formatTime(timeString)
  } else {
    return timeString
  }
}

export const concatDateTime = (dateString: string, timeString: string) => {
  const date = dateValidator(dateString)
  const time = timeValidator(timeString)
  return `${date} ${time}`
}
