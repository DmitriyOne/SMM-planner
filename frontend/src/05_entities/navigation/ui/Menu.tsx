import { customLinks } from "../config"
import { MenuItem } from "./MenuItem"

import styles from "./menu.module.scss"

export const Menu = () => {
  // TODO: add user info
  const menuLinks = customLinks(false, null)

  return (
    <ul className={styles.component}>
      {menuLinks.map((link) => (
        <MenuItem
          key={link.href}
          username={null}
          {...link}
        />
      ))}
    </ul>
  )
}
