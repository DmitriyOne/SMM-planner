import { FC } from "react"

import { BreadcrumbItem } from "@/05_entities/breadcrumb-item/ui"

import { BreadcrumbsTypes } from "@/06_shared/config/enums/breadcrumb"

import {
  getBreadcrumbSegments,
  TBreadcrumbParams,
} from "@/06_shared/lib/breadcrumbs"
import { isValidArray } from "@/06_shared/model/utils"

import styles from "./breadcrumbs.module.scss"

type TProps = {
  type: BreadcrumbsTypes
  params?: TBreadcrumbParams
}

export const Breadcrumbs: FC<TProps> = ({ type, params }) => {
  const segments = getBreadcrumbSegments(type, params)

  if (!isValidArray(segments)) {
    return <></>
  }

  return (
    <nav
      className={styles.component}
      aria-label='Breadcrumb'
    >
      <ol className={styles.list}>
        {segments.map((segment, index) => (
          <BreadcrumbItem
            key={segment.href}
            href={segment.href}
            label={segment.label}
            isLast={index === segments.length - 1}
          />
        ))}
      </ol>
    </nav>
  )
}
