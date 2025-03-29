import { TPost } from "@/05_entities/post/model"
import { FC } from "react"
import Text from "antd/es/typography/Text"

import styles from "./post-description.module.scss"
import classNames from "classnames"

type TProps = Pick<TPost, "description"> & {
  className?: string
}

export const PostDescription: FC<TProps> = ({ className, description }) => {
  const componentClassName = classNames(styles.component, className)

  return (
    <Text
      className={componentClassName}
      type='secondary'
    >
      {description}
    </Text>
  )
}
