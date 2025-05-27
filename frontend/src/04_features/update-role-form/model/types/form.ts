export type TActionState = {
  success?: boolean
  successMessage?: string
  errors?: {
    userId?: string[]
    role?: string[]
    api?: string[]
  }
}
