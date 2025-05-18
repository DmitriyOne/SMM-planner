import { TDateFields } from "@/06_shared/api/types"
import { ERole } from "../enums"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { TPost } from "@/05_entities/post/model"

export type TUser = {
  id: string
  email: string
  role: ERole
  name: string
  posts: TPost[]
  tags: TTag[]
} & TDateFields
