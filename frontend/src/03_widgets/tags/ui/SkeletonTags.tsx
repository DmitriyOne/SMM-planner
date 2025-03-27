/* eslint-disable react/no-array-index-key */
import { Tag } from "@/05_entities/tag/ui"
import Skeleton from "react-loading-skeleton"

import styles from "./skeleton-tags.module.scss"

export const SkeletonTags = () => {
  return (
    <div className={styles.component}>
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          width='65px'
          height='22px'
          style={{ marginRight: "8px" }}
        />
      ))}

      <Tag className={styles.hide}>Hide</Tag>
    </div>
  )
}
