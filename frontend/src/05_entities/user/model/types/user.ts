import { TDateFields } from "@/06_shared/api/types"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { TPost } from "@/05_entities/post/model/types"
import { ERole } from "@/06_shared/model/enum"

export type TUser = {
  id: string
  email: string
  role: ERole
  name: string
  posts: TPost[]
  tags: TTag[]
} & TDateFields

export type TEditableUserField = keyof Omit<
  TUser,
  "id" | "password" | "createdAt" | "updatedAt" | "posts" | "tags"
>

export type TUpdatableUserData = Partial<
  Omit<TUser, "id" | "createdAt" | "updatedAt">
>

export type TChangePasswordDTO = {
  oldPassword: string
  newPassword: string
}
