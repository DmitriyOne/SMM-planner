import { Menu } from "@/05_entities/navigation/ui"
import { Logo } from "@/06_shared/ui"

import { Container } from "@/06_shared/ui/container"

import { getAuthorizedUserByToken } from "@/05_entities/user/lib"
import { getHeaderMenuItems } from "../lib"

import styles from "./header.module.scss"

export const Header = async () => {
  const user = await getAuthorizedUserByToken()
  const menuItems = getHeaderMenuItems(user)

  return (
    <header className={styles.component}>
      <Container className={styles.wrapper}>
        <Logo />
        <Menu
          itemClassName={styles.item}
          items={menuItems}
        />
      </Container>
    </header>
  )
}
