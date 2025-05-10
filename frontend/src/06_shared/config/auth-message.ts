export const AUTH_MESSAGE = {
  INVALID_DATA: (username: string, password: string) =>
    `Invalid basic auth attempt: username="${username}" & password="${password}"`,
}
