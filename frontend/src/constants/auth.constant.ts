export const AUTH_UNAUTHORIZED_MSG = 'Unauthorized'
export const AUTH_UNAUTHORIZED_CODE = 401
export const AUTH_BASE_WWW_HEADER_NAME = 'WWW-Authenticate'
export const AUTH_BASE_WWW_HEADER_VALUE = 'Basic realm="My Application"'
export const AUTH_BASE_INVALID_DATA = (username: string, password: string) =>
  `Invalid basic auth attempt: username="${username}" & password="${password}"`
