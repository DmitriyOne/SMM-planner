import { IMenuItem } from "@/06_shared/model/types"
import { paths } from "../routing"

export const HEADER_MENU_GUEST: IMenuItem[] = [
  {
    title: "Login",
    href: paths.login,
    show: true,
  },
  {
    title: "Register",
    href: paths.register,
    show: true,
  },
]
