import { ERole } from "@/06_shared/model/enum"
import { IMenuItem } from "@/06_shared/model/types"
import { paths } from "../routing"
import { canCreateContent } from "@/06_shared/model/utils"

export const getHeaderMenuForUser = (
  username: string | undefined | null,
  role: ERole = ERole.reader,
): IMenuItem[] => [
  {
    title: "New post",
    href: paths.post_create,
    show: canCreateContent(role),
  },
  {
    title: "New tag",
    href: paths.tag_create,
    show: canCreateContent(role),
  },
  {
    title: username?.trim() || "Profile",
    href: paths.profile,
    show: true,
    avatar: true,
  },
]
