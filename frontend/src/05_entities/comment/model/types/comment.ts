import { TUser } from "@/05_entities/user/model/types"
import { TDateFields } from "@/06_shared/api/types"

export type TComment = {
  id: number
  content: string
  authorId: string
  author: TUser
  postId: number
} & TDateFields

export type TCreateComment = {
  content: string
}
