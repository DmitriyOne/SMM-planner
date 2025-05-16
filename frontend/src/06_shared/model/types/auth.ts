export type AuthFormActionState = {
  success?: boolean
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    apiError?: string[]
  }
}
