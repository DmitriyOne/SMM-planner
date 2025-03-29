import { TPost } from "@/05_entities/post/model"
import Title from "antd/es/typography/Title"
import classNames from "classnames"
import { FC } from "react"

import styles from "./post-title.module.scss"

type TProps = Pick<TPost, "title"> & {
  className?: string
  level?: 1 | 5 | 2 | 3 | 4 | undefined
}

export const PostTitle: FC<TProps> = ({ title, className, level }) => {
  const componentClassName = classNames(styles.component, className)

  return (
    <Title
      className={componentClassName}
      level={level}
    >
      {title}
    </Title>
  )
}
