"use server"

import { AuthFormActionState } from "@/06_shared/model/types"
import { loginSchema } from "../schemas"
import { login } from "@/06_shared/api/auth"
import {
  deleteAccessTokenFromCookie,
  setAccessTokenCookie,
} from "@/06_shared/lib/auth"
import { AUTH_INPUT_IDS, AUTH_MESSAGE } from "../../config"

export const loginAction = async (
  _prevState: AuthFormActionState | null,
  formData: FormData,
): Promise<AuthFormActionState> => {
  const email = formData.get(AUTH_INPUT_IDS.email) as string
  const password = formData.get(AUTH_INPUT_IDS.password) as string
  const rememberMe = formData.get(AUTH_INPUT_IDS.rememberMe) as string

  const result = loginSchema.safeParse({ email, password })
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const { accessToken } = await login(result.data)
    if (rememberMe) {
      await setAccessTokenCookie(accessToken)
    }
    return { success: true, errors: {} }
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
