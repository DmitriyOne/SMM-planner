import { paths } from "@/06_shared/config/routing"
import { THeaderItem } from "../model"

export const customLinks = (
  authenticated: boolean,
  username: string | null,
): THeaderItem[] => [
  {
    title: "Login",
    href: paths.login,
    condition: !authenticated,
  },
  {
    title: "Register",
    href: paths.register,
    condition: !authenticated,
  },
  {
    title: "Create post",
    href: paths.post_create,
    condition: authenticated,
  },
  {
    title: "Create tag",
    href: paths.tag_create,
    condition: authenticated,
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
