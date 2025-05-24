import { FC } from "react"
import Skeleton from "react-loading-skeleton"
import classNames from "classnames"

import styles from "./comment-item.module.scss"

type TProps = {
  isAuthor: boolean
}

export const CommentItemSkeleton: FC<TProps> = ({ isAuthor }) => {
  const componentClassName = classNames(styles.component, styles.skeleton, {
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
    [styles.marginLeft]: isAuthor,
    [styles.marginRight]: !isAuthor,
  })
  const dateClassName = classNames(styles.date, {
    [styles.mr]: isAuthor,
    [styles.ml]: !isAuthor,
  })

  return (
    <div className={componentClassName}>
      <div className={headerClassName}>
        <div className={authorContainerClassName}>
          <Skeleton
            circle
            width={32}
            height={32}
            containerClassName={avatarClassName}
          />
          <Skeleton
            width={100}
            height={20}
            className={styles.username}
          />
        </div>
        <span className={dateClassName}>
          <Skeleton
            width={85}
            height={12}
          />
        </span>
      </div>
      <p className={styles.content}>
        <Skeleton
          width='100%'
          count={2}
          height={16}
        />
      </p>
    </div>
  )
}
