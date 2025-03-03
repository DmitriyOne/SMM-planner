export const AUTH_FAILED_MSG = ' Authentication failed'
export const AUTH_NOT_FOUND_BY_EMAIL_MSG = (email: string) => `No user found for email: ${email}`
export const AUTH_EMAIL_ALREADY_EXISTS_MSG = (email: string) => `User with email (${email}) already exists`
export const AUTH_INVALID_PASSWORD_MSG = 'Invalid password'
export const AUTH_PASSWORD_LATIN_ALPHABET_REGEX = /^[A-Za-z0-9]+$/
export const AUTH_PASSWORD_TWO_UPPERCASE_LETTERS_REGEX = /^(?=(.*[A-Z]){2,})/
export const AUTH_PASSWORD_TWO_DIGITS_REGEX = /^(?=(.*[0-9]){2,})/
export const AUTH_PASSWORD_NOT_LATIN_ALPHABET_MSG = 'Password must contain only Latin alphabet'
export const AUTH_PASSWORD_NOT_TWO_UPPERCASE_LETTERS_MSG = 'Password must contain at least two uppercase letters'
export const AUTH_PASSWORD_NOT_TWO_DIGITS_MSG = 'Password must contain at least two digits'
export const AUTH_FAKE_JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
export const AUTH_BASE_INVALID_MSG = 'Invalid credentials'
export const AUTH_BASE_WWW_HEADER_NAME = 'WWW-Authenticate'
export const AUTH_BASE_WWW_HEADER_VALUE = 'Basic realm="My Application"'
