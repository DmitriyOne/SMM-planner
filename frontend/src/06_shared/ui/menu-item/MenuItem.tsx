import { FC } from "react"

import { ActiveLink } from "@/06_shared/ui/active-link"

import { IMenuItem } from "@/06_shared/model/types/menu"

import styles from "./menu-item.module.scss"
import classNames from "classnames"

type TProps = {
  className?: string
  item: IMenuItem
}

export const MenuItem: FC<TProps> = ({ className, item }) => {
  if (!item.show) {
    return <></>
  }

  const Icon = item.icon

  const componentClassName = classNames(styles.component, className)

  return (
    <li
      key={item.href}
      className={componentClassName}
    >
      {Icon && <Icon style={{ marginRight: 8 }} />}
      <ActiveLink
        href={item.href}
        className={styles.item}
      >
        {item.title}
      </ActiveLink>
    </li>
  )
}
