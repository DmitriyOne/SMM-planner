import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons"

import { paths } from "../routing"
import { IMenuItem } from "@/06_shared/model/types"
import { canManageRoles } from "@/06_shared/model/utils"

import { ERole } from "@/06_shared/model/enum"

export const getSidebarMenu = (role: ERole = ERole.reader): IMenuItem[] => [
  {
    title: "Profile",
    href: paths.profile,
    show: true,
    icon: UserOutlined,
  },
  {
    title: "Settings",
    href: paths.settings,
    show: true,
    icon: SettingOutlined,
  },
  {
    title: "Update role",
    href: paths.update_role,
    show: canManageRoles(role),
    icon: EditOutlined,
  },
  {
    title: "Logout",
    href: `/logout`,
    show: true,
    icon: LogoutOutlined,
  },
]
