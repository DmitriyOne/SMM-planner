export const isPromise = <T>(value: T | Promise<T>): value is Promise<T> => {
  return typeof (value as any)?.then === "function"
}
