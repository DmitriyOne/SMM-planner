import { CommentItemSkeleton } from "@/05_entities/comment/ui"
import { COMMENT_SKELETON_ITEMS } from "../../config"

import styles from "./comment-list.module.scss"

export const CommentListSkeleton = () => {
  return (
    <div className={styles.component}>
      {COMMENT_SKELETON_ITEMS.map((comment) => (
        <CommentItemSkeleton
          key={comment.id}
          isAuthor={comment.isAuthor}
        />
      ))}
    </div>
  )
}
