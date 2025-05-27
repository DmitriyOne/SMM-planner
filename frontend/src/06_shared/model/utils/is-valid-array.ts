export const isValidArray = <T>(value: T | any[]): value is T | any[] =>
  Array.isArray(value) && value.length > 0
