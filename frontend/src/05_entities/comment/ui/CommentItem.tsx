import { FC } from "react"
import classNames from "classnames"

import { Avatar, Button } from "antd"

import { TComment } from "../model/types"
import { formatIsoToDatetime } from "@/06_shared/model/utils"

import styles from "./comment-item.module.scss"

type TProps = {
  comment: TComment
  isAuthor: boolean
  onDelete: (postId: string, commentId: string) => void
}

export const CommentItem: FC<TProps> = ({ comment, isAuthor, onDelete }) => {
  const componentClassName = classNames(styles.component, {
    [styles.author]: isAuthor,
    [styles.other]: !isAuthor,
  })
  const headerClassName = classNames(styles.header, {
    [styles.rowReverse]: isAuthor,
    [styles.row]: !isAuthor,
  })
  const authorContainerClassName = classNames(styles.authorContainer, {
    [styles.rowReverse]: isAuthor,
    [styles.row]: !isAuthor,
  })
  const avatarClassName = classNames(styles.avatar, {
    [styles.bgAuthor]: isAuthor,
    [styles.bgOther]: !isAuthor,
    [styles.marginLeft]: isAuthor,
    [styles.marginRight]: !isAuthor,
  })
  const usernameClassName = classNames(styles.username, {
    [styles.colorTextAuthor]: isAuthor,
    [styles.colorTextOther]: !isAuthor,
  })
  const dateClassName = classNames(styles.date, {
    [styles.colorTextAuthor]: isAuthor,
    [styles.colorTextOther]: !isAuthor,
    [styles.mr]: isAuthor,
    [styles.ml]: !isAuthor,
  })
  const contentClassName = classNames(styles.content, {
    [styles.colorTextAuthor]: isAuthor,
    [styles.colorTextOther]: !isAuthor,
  })
  const updateButtonClassName = classNames(styles.button, styles.update)
  const deleteButtonClassName = classNames(styles.button, styles.delete)

  return (
    <div className={componentClassName}>
      <div className={headerClassName}>
        <div className={authorContainerClassName}>
          <Avatar className={avatarClassName}>
            {comment.author.name.charAt(0).toUpperCase()}
          </Avatar>
          <strong className={usernameClassName}>{comment.author.name}</strong>
        </div>
        <span className={dateClassName}>
          {formatIsoToDatetime(comment.createdAt)}
        </span>
      </div>
      <p className={contentClassName}>{comment.content}</p>

      {isAuthor && (
        <div className={styles.buttonContainer}>
          <Button
            className={updateButtonClassName}
            type='primary'
            disabled
          >
            Update
          </Button>
          <Button
            className={deleteButtonClassName}
            danger
            onClick={() =>
              onDelete(comment.postId.toString(), comment.id.toString())
            }
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}
