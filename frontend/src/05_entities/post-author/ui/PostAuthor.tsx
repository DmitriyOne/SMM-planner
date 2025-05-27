import { TUser } from "@/05_entities/user/model/types"
import Text from "antd/es/typography/Text"
import { FC } from "react"
import classNames from "classnames"

import styles from "./post-author.module.scss"

type TProps = {
  title?: string
  componentClassName?: string
  nameClassName?: string
  size?: "small" | "default"
} & Pick<TUser, "name">

export const PostAuthor: FC<TProps> = ({
  title = "by",
  name,
  componentClassName,
  nameClassName,
  size = "default",
}) => {
  const componentClass = classNames(componentClassName, {
    [styles[size]]: size,
  })
  const nameClass = classNames(styles.username, nameClassName)

  return (
    <Text
      type='secondary'
      className={componentClass}
    >
      {title} <span className={nameClass}>{name}</span>
    </Text>
  )
}
