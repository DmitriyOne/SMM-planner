export type AuthFormActionState = {
  success?: boolean
  errors?: {
    email?: string[]
    password?: string[]
    apiError?: string[]
  }
}
