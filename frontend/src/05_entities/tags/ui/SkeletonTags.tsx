/* eslint-disable react/no-array-index-key */
import Skeleton from "react-loading-skeleton"

import styles from "./skeleton-tags.module.scss"
import { Tag } from "@/06_shared/ui/tag/ui"
import { FC } from "react"
import classNames from "classnames"

type TProps = {
  amount?: number
  componentClassName?: string
}

export const SkeletonTags: FC<TProps> = ({
  amount = 5,
  componentClassName,
}) => {
  const componentClass = classNames(styles.component, componentClassName)

  return (
    <div className={componentClass}>
      {[...Array(amount)].map((_, index) => (
        <Skeleton
          key={index}
          width='55px'
          height='22px'
          style={{ marginRight: "8px" }}
        />
      ))}

      <Tag className={styles.hide}>Hide</Tag>
    </div>
  )
}
