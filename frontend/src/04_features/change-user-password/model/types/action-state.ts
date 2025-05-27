export type TActionState = {
  success?: boolean
  successMessage?: string
  errors?: {
    oldPassword?: string[]
    newPassword?: string[]
    confirmPassword?: string[]
    api?: string[]
  }
}
