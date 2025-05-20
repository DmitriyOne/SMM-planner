import { TDateFields } from "@/06_shared/api/types"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { TPost } from "@/05_entities/post/model"
import { ERole } from "@/06_shared/model/enum"

export type TUser = {
  id: string
  email: string
  role: ERole
  name: string
  posts: TPost[]
  tags: TTag[]
} & TDateFields
