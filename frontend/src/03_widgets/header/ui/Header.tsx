import { Menu } from "@/05_entities/navigation/ui"
import { Logo } from "@/06_shared/ui"

import { Container } from "@/06_shared/ui/container"
import { HEADER_MENU_GUEST } from "@/06_shared/config/menu"

import styles from "./header.module.scss"

export const Header = () => {
  return (
    <header className={styles.component}>
      <Container className={styles.wrapper}>
        <Logo />
        <Menu items={HEADER_MENU_GUEST} />
      </Container>
    </header>
  )
}
