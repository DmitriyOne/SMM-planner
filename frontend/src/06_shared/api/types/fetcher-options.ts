export type TFetcherOptions = Omit<
  RequestInit,
  "body" | "headers" | "method"
> & {
  body?: Record<string, any> | string | null
  token?: string
}
