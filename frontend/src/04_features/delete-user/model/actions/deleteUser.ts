"use server"

import {
  deleteAccessTokenFromCookie,
  getAccessTokenFromCookies,
} from "@/06_shared/lib/auth"
import { TActionState } from "../types"
import { deleteUser } from "@/05_entities/user/api"
import { IDS, MESSAGE } from "../../config"

export const deleteUserAction = async (
  _prevState: TActionState | null,
  formData: FormData,
): Promise<TActionState> => {
  const userId = formData.get(IDS.user_id) as string
  try {
    const token = await getAccessTokenFromCookies()
    const { message } = await deleteUser(token as string, userId)
    await deleteAccessTokenFromCookie()
    return { success: true, successMessage: message, errors: {} }
  } catch (error) {
    await deleteAccessTokenFromCookie()
    const errorMessage =
      error instanceof Error ? error.message : MESSAGE.SOMETHING_WENT_WRONG
    return {
      success: false,
      errors: { api: [errorMessage] },
    }
  }
}
