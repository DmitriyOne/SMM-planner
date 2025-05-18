export type AuthFormActionState = {
  success?: boolean
  userId?: string
  accessToken?: string
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    api?: string[]
  }
}
