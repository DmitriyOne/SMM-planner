export const AUTH_MESSAGE = {
  INVALID_DATA: (username: string, password: string) =>
    `Invalid basic auth attempt: username="${username}" & password="${password}"`,
}

export const AUTH_VALIDATE_MSG = {
  name: {
    min: "Username must be at least 3 characters long",
  },
  email: {
    invalid: "Invalid email",
  },
  password: {
    min: "Password must be at least 6 characters long",
    latin: "Password must contain only Latin alphabet",
    uppercase: "Password must contain at least two uppercase letters",
    digits: "Password must contain at least two digits",
    notMatch: "Passwords do not match",
  },
}
