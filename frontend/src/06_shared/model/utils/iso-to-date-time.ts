export const formatIsoToDatetime = (isoString: string): string => {
  const date = new Date(isoString)

  if (isNaN(date.getTime())) {
    return "Invalid date"
  }

  const formattedDate = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  const formattedTime = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  return `${formattedDate} ${formattedTime}`
}
