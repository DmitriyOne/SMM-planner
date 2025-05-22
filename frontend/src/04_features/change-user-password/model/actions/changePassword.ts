"use server"

import { changePasswordSchema } from "../schemas"
import { INPUT_ID, MESSAGE } from "../../config"
import { TActionState } from "../types"
import { changePassword } from "@/05_entities/user/api"
import { getAccessTokenFromCookies } from "@/06_shared/lib/auth"

export const changePasswordAction = async (
  _prevState: TActionState | null,
  formData: FormData,
): Promise<TActionState> => {
  const oldPassword = formData.get(INPUT_ID.old_password) as string
  const newPassword = formData.get(INPUT_ID.new_password) as string
  const confirmPassword = formData.get(INPUT_ID.confirm_password) as string

  const result = changePasswordSchema.safeParse({
    oldPassword,
    newPassword,
    confirmPassword,
  })

  if (!result.success) {
    return {
      success: false,
      successMessage: "",
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const token = await getAccessTokenFromCookies()
    if (!token) {
      return {
        success: false,
        successMessage: "",
        errors: {
          api: [MESSAGE.TOKEN_NOT_FOUND],
        },
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newUser } = result.data
    const { message } = await changePassword(token, newUser)

    return {
      success: true,
      successMessage: message,
      errors: {},
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : MESSAGE.PASSWORD_CHANGED_ERROR

    if (errorMessage === MESSAGE.PASSWORD_INVALID) {
      return {
        success: false,
        errors: { oldPassword: [MESSAGE.OLD_PASSWORD_INCORRECT] },
      }
    }

    return {
      success: false,
      successMessage: "",
      errors: { api: [errorMessage] },
    }
  }
}
