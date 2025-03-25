export const HttpStatusCode = {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export type HttpStatusCode =
  (typeof HttpStatusCode)[keyof typeof HttpStatusCode]

export const HttpMessage = {
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Not Found",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
} as const

export type HttpMessage = (typeof HttpMessage)[keyof typeof HttpMessage]
