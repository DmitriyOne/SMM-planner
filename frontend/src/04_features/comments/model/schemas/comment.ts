import { z } from "zod"
import { MESSAGE } from "../../config"

export const commentCreateSchema = z.object({
  comment: z.string().min(4, MESSAGE.COMMENT_MUST_BE_LONGER),
})
