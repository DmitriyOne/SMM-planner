export type AuthFormActionState = {
  success?: boolean
  accessToken?: string
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    api?: string[]
  }
}
