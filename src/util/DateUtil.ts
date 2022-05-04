import dayjs from 'dayjs'

const diffYearsFromToday = (date: string): number => {
  const date1 = dayjs(date);
  const years = dayjs().diff(date1, 'year')

  return years
}

const formatDate = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY')
}

const formatDateTime = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
}

export { diffYearsFromToday, formatDate, formatDateTime }