import { customLinks } from "../config"
import { MenuItem } from "./MenuItem"

import styles from "./menu.module.scss"

export const Menu = () => {
  const currentUser: any = {
    id: 1,
    name: "John Doe",
    username: "john",
  }

  const authorized = !!currentUser

  const menuLinks = customLinks(authorized, currentUser.username)

  return (
    <ul className={styles.component}>
      {menuLinks.map((link) => (
        <MenuItem
          key={link.href}
          username={currentUser?.username}
          {...link}
        />
      ))}
    </ul>
  )
}
