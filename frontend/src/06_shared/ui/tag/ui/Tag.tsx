import { Tag as AntdTag } from "antd"
import { FC, PropsWithChildren } from "react"
import classNames from "classnames"

import styles from "./tag.module.scss"

type TProps = {
  componentClassName?: string
} & PropsWithChildren

export const Tag: FC<TProps> = ({ componentClassName, children }) => {
  // TODO: add getRandomColor
  const tagColor = "default"

  const componentClass = classNames(styles.component, componentClassName)

  return (
    <AntdTag
      className={componentClass}
      color={tagColor}
    >
      {children}
    </AntdTag>
  )
}
