import { FC } from "react"

import { MenuItem } from "@/06_shared/ui"
import { IMenuItem } from "@/06_shared/model/types/menu"

import styles from "./menu.module.scss"
import classNames from "classnames"

type TProps = {
  className?: string
  itemClassName?: string
  items: IMenuItem[]
}

export const Menu: FC<TProps> = ({ className, itemClassName, items }) => {
  const componentClassName = classNames(styles.component, className)
  return (
    <ul className={componentClassName}>
      {items.map((item) => (
        <MenuItem
          key={item.href}
          item={item}
          className={itemClassName}
        />
      ))}
    </ul>
  )
}
