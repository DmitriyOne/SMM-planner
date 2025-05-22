import { TUser } from "@/05_entities/user/model/types"

import { TDateFields } from "@/06_shared/api/types"
import { TTag } from "@/06_shared/ui/tag/model/types"

export type TPost = {
  id: number
  title: string
  description: string
  image: string | null
  isPublish: boolean
  isApproved: boolean
  authorId: string
  author: TUser
  tags: TTag[]
} & TDateFields

export type TPostCreateBody = Omit<
  TPost,
  "id" | "createdAt" | "updatedAt" | "author" | "authorId" | "tags"
> & {
  tags: { title: string }[]
}

export type TEditablePostField = keyof Omit<
  TPost,
  "id" | "createdAt" | "updatedAt"
>

export type TUpdatablePostData = Partial<
  Omit<TPost, "id" | "createdAt" | "updatedAt">
>

