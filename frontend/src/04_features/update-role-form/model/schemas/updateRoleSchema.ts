import { z } from "zod"
import { MESSAGE } from "../../config"
import { ERole } from "@/06_shared/model/enum"

export const updateRoleSchema = z.object({
  userId: z.string().uuid(MESSAGE.INVALID_UUID_FORMAT),
  role: z.enum(Object.values(ERole) as [string, ...string[]]),
})
