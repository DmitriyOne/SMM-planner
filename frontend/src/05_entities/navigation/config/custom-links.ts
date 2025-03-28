import { paths } from "@/06_shared/config/routing"
import { THeaderItem } from "../model"

export const customLinks = (
  authenticated: boolean,
  username: string | null,
): THeaderItem[] => [
  {
    title: "Sing up",
    href: paths.register,
    condition: !authenticated,
  },
  {
    title: "Sing in",
    href: paths.login,
    condition: !authenticated,
  },
  {
    title: username ?? "Profile",
    href: paths.profile,
    condition: authenticated,
  },
  {
    title: "Logout",
    href: `/logout`,
    condition: authenticated,
  },
]
