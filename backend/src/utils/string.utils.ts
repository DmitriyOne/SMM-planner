export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const toUpperCaseString = (str: string): string => {
  if (!str) return str

  return str.toUpperCase()
}
