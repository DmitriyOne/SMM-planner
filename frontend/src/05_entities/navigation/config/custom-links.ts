import { THeaderItem } from "../model"

export const customLinks = (
  authenticated: boolean,
  username: string | null,
): THeaderItem[] => [
  {
    title: "All posts",
    href: "/posts",
    condition: true,
  },
  {
    title: "Sing up",
    href: "/register",
    condition: !authenticated,
  },
  {
    title: "Sing in",
    href: "/login",
    condition: !authenticated,
  },
  {
    title: username ?? "Profile",
    href: "/profile",
    condition: authenticated,
  },
  {
    title: "Logout",
    href: `/logout`,
    condition: authenticated,
  },
]
