import { FC } from "react"

import styles from "./breadcrumb-item.module.scss"
import { ActiveLink } from "@/06_shared/ui"
import { TBreadcrumbSegment } from "../model"

type TProps = TBreadcrumbSegment & {
  isLast: boolean
}

export const BreadcrumbItem: FC<TProps> = ({ href, label, isLast }) => {
  return (
    <li className={styles.item}>
      <ActiveLink
        href={href}
        className={styles.link}
      >
        {label}
      </ActiveLink>
      {!isLast && <span className={styles.separator}>/</span>}
    </li>
  )
}
