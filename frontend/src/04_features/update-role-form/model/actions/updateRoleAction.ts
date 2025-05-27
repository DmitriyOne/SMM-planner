"use server"

import { getAccessTokenFromCookies } from "@/06_shared/lib/auth"
import { IDS, MESSAGE } from "../../config"
import { updateRoleSchema } from "../schemas"
import { TActionState } from "../types"
import { updateRole } from "@/05_entities/user/api"
import { ERole } from "@/06_shared/model/enum"

export const updateRoleAction = async (
  _prevState: TActionState | null,
  formData: FormData,
): Promise<TActionState> => {
  const userId = formData.get(IDS.user_id) as string
  const role = formData.get(IDS.role) as string

  const result = updateRoleSchema.safeParse({ userId, role })
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const token = await getAccessTokenFromCookies()
    const { message } = await updateRole(
      token as string,
      result.data.userId,
      result.data.role as ERole,
    )
    return { success: true, successMessage: message, errors: {} }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : MESSAGE.SOMETHING_WENT_WRONG
    return {
      success: false,
      errors: { api: [errorMessage] },
    }
  }
}
