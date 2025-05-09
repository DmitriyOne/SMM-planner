import { Tag as AntdTag } from "antd"
import { FC, PropsWithChildren } from "react"
import classNames from "classnames"

import { getRandomColor } from "../lib"

import styles from "./tag.module.scss"

type TProps = {
  id: number
  componentClassName?: string
} & PropsWithChildren

export const Tag: FC<TProps> = ({ id, componentClassName, children }) => {
  const tagColor = getRandomColor(id?.toString() || "default")

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
