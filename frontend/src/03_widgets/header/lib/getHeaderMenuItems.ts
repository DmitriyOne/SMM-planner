import { TUser } from "@/05_entities/user/model/types"
import {
  getHeaderMenuForUser,
  HEADER_MENU_GUEST,
} from "@/06_shared/config/menu"

export const getHeaderMenuItems = (user: TUser | null) => {
  if (user && user.id) {
    return getHeaderMenuForUser(user.name, user.role)
  }

  return HEADER_MENU_GUEST
}
