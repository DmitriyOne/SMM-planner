import { FC } from "react"

import { TComment } from "@/05_entities/comment/model/types"
import { TUser } from "@/05_entities/user/model/types"
import { isValidArray } from "@/06_shared/model/utils"

import { CommentEmpty, CommentItem } from "@/05_entities/comment/ui"

import styles from "./comment-list.module.scss"

type TProps = {
  comments: TComment[]
  user: TUser | null
  handleDelete: (postId: string, commentId: string) => void
}

export const CommentList: FC<TProps> = ({ comments, user, handleDelete }) => {
  if (!isValidArray(comments)) {
    return <CommentEmpty />
  }

  return (
    <div className={styles.component}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAuthor={comment.authorId === user?.id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
