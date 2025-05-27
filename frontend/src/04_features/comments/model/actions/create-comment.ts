"use server"

import { createComment } from "@/05_entities/comment/api"
import { IDS, MESSAGE } from "../../config"
import { commentCreateSchema } from "../schemas"
import { TActionState } from "../types"
import { getAccessTokenFromCookies } from "@/06_shared/lib/auth"

export const createCommentAction = async (
  _prevState: TActionState | null,
  formData: FormData,
): Promise<TActionState> => {
  const comment = formData.get(IDS.comment) as string
  const postId = formData.get(IDS.post_id) as string

  const result = commentCreateSchema.safeParse({ comment })
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const token = await getAccessTokenFromCookies()
    const data = await createComment(token as string, postId, {
      content: result.data.comment,
    })
    return { success: true, comment: data, errors: {} }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : MESSAGE.SOMETHING_WENT_WRONG
    return {
      success: false,
      errors: { api: [errorMessage] },
    }
  }
}
