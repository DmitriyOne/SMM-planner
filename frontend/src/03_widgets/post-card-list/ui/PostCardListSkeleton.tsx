/* eslint-disable react/no-array-index-key */

import { PostCardSkeleton } from "@/05_entities/post-card/ui"

import styles from "./post-card-list-skeleton.module.scss"

export const PostCardListSkeleton = () => {
  return (
    <div className={styles.component}>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
    </div>
  )
}
