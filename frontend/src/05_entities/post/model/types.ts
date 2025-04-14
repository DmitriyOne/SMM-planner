import { TUser } from "@/05_entities/user/model"

import { TDateFields } from "@/06_shared/api/types"
import { TTag } from "@/06_shared/ui/tag/model/types"

export type TPost = {
  id: number
  title: string
  description: string
  image: string
  isPublish: boolean
  isApproved: boolean
  authorId: string
  author: TUser
  tags: TTag[]
} & TDateFields
