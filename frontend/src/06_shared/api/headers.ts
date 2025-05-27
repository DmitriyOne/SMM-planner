export const Headers = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
  WWW_AUTHENTICATE: "WWW-Authenticate",
} as const

export type HeaderRequest = (typeof Headers)[keyof typeof Headers]

export const HeadersValue = {
  CONTENT_TYPE_JSON: "application/json",
  AUTHORIZATION_BEARER: "Bearer",
  WWW_AUTHENTICATE_BASIC: 'Basic realm="My Application"',
} as const

export type HeaderValue = (typeof HeadersValue)[keyof typeof HeadersValue]
