"use server"

import { AuthFormActionState } from "@/06_shared/model/types"
import { registerSchema } from "../schemas"
import { register } from "@/06_shared/api/auth"
import {
  deleteAccessTokenFromCookie,
  setAccessTokenCookie,
} from "@/06_shared/lib/auth"
import { AUTH_INPUT_IDS, AUTH_MESSAGE } from "../../config"

export const registerAction = async (
  _prevState: AuthFormActionState | null,
  formData: FormData,
): Promise<AuthFormActionState> => {
  const name = formData.get(AUTH_INPUT_IDS.name) as string
  const email = formData.get(AUTH_INPUT_IDS.email) as string
  const password = formData.get(AUTH_INPUT_IDS.password) as string
  const confirmPassword = formData.get(AUTH_INPUT_IDS.confirmPassword) as string
  const rememberMe = formData.get(AUTH_INPUT_IDS.rememberMe) as string

  const result = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  })
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newUser } = result.data
    const { accessToken } = await register(newUser)
    if (rememberMe) {
      await setAccessTokenCookie(accessToken)
    }
    return { success: true, accessToken }
  } catch (error) {
    deleteAccessTokenFromCookie()
    const errorMessage =
      error instanceof Error ? error.message : AUTH_MESSAGE.error
    return {
      success: false,
      errors: { api: [errorMessage] },
    }
  }
}
