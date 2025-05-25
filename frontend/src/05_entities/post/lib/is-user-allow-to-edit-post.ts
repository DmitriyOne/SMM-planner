import { ERole } from "@/06_shared/model/enum"

export const isUserAllowToEditPost = (
  userRole: ERole | null | undefined,
  userId: string | null | undefined,
  postAuthorId: string | null | undefined,
) => {
  return userRole === "super_admin" || userRole === "admin" || userId === postAuthorId
}
