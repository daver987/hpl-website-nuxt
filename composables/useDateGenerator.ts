export interface DateObject {
  date: string
  isOtherMonth?: boolean
  isCurrentMonth?: boolean
  isToday?: boolean
  isSelected?: boolean
}

function useDateGenerator(year: number, month: number) {
  let monthNum = month
  const calendarDates = []

  // Get the current date
  const currentDate = new Date()

  // Get the first and last day of the month
  const firstDay = new Date(year, monthNum, 1)
  const lastDay = new Date(year, monthNum + 1, 0)

  // Get the day of the week for the first day of the month (0-6, 0 is Sunday)
  const firstDayOfWeek = firstDay.getDay()

  // Get the total number of days in the month
  const totalDays = lastDay.getDate()

  // Add the previous month's dates to the calendarDates array, if needed
  if (firstDayOfWeek > 0) {
    // Get the last day of the previous month
    const prevLastDay = new Date(year, monthNum, 0)
    const prevTotalDays = prevLastDay.getDate()
    let prevYear = year
    let prevMonth = monthNum - 1
    if (prevMonth < 0) {
      prevMonth = 11
      prevYear--
    }
    if (prevMonth < 10) {
      prevMonth = `0${prevMonth}` as unknown as number
    }

    // Add the previous month's dates to the calendarDates array
    for (let i = prevTotalDays - firstDayOfWeek + 1; i <= prevTotalDays; i++) {
      let day = i
      if (day < 10) {
        day = `0${day}` as unknown as number
      }
      calendarDates.push({
        date: `${day}-${prevMonth}-${prevYear}`,
        isOtherMonth: true,
        isSelected: false,
      })
    }
  }

  // Add the current month's dates to the calendarDates array
  for (let i = 1; i <= totalDays; i++) {
    let day = i
    monthNum = month + 1
    if (day < 10) {
      day = `0${day}` as unknown as number
    }
    if (monthNum < 10) {
      monthNum = `0${monthNum}` as unknown as number
    }
    const dateObject = {
      date: `${day}-${monthNum}-${year}`,
      isCurrentMonth: true,
      isSelected: false,
    }
    if (
      currentDate.getFullYear() === year &&
      currentDate.getMonth() === month &&
      currentDate.getDate() === i
    ) {
      // @ts-ignore
      dateObject.isToday = true
    }
    calendarDates.push(dateObject)
  }

  // Add the next month's dates to the calendarDates array, if needed
  if (calendarDates.length < 35) {
    let i = 1
    while (calendarDates.length % 7 !== 0) {
      let day = i
      monthNum = month + 2
      if (day < 10) {
        day = `0${day}` as unknown as number
      }
      if (monthNum > 11) {
        monthNum = 0
        year++
      }
      if (monthNum < 10) {
        monthNum = `0${monthNum}` as unknown as number
      }
      calendarDates.push({
        date: `${day}-${monthNum}-${year}`,
        isOtherMonth: true,
        isSelected: false,
      })
      i++
    }
  }

  return calendarDates
}

export { useDateGenerator, getCurrentMonth }
