import { TPost } from "@/05_entities/post-card/model"
import { TDateFields } from "@/06_shared/api/types/date-fields"

export type TTag = {
  id: number
  title: string
  authorId: string
  // TODO: do you need need author and posts?
  author: any
  posts: TPost[]
} & TDateFields
