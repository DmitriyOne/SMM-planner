import { TPost } from "@/05_entities/post/model/types"
import { TUser } from "@/05_entities/user/model/types"
import { TDateFields } from "@/06_shared/api/types/date-fields"

export type TTag = {
  id: number
  title: string
  authorId: string
  author: TUser
  posts: Omit<TPost[], "tags">
} & TDateFields
