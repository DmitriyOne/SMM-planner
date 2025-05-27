import { TPost } from "@/05_entities/post/model/types"
import Title from "antd/es/typography/Title"
import classNames from "classnames"
import { FC, PropsWithChildren } from "react"

import { editableConfig } from "@/06_shared/config"

import styles from "./post-title.module.scss"

type TProps = Pick<TPost, "title"> & {
  className?: string
  level?: 1 | 5 | 2 | 3 | 4 | undefined
  isEditable?: boolean
  editableText?: string
  handleEditable?: (title: string) => void
  handleEditableSuccess?: () => void
} & PropsWithChildren

export const PostTitle: FC<TProps> = ({
  title,
  className,
  level,
  isEditable,
  editableText,
  handleEditableSuccess,
  handleEditable,
  children,
}) => {
  const componentClassName = classNames(styles.component, className)

  const editable = isEditable
    ? editableConfig(editableText, handleEditable, handleEditableSuccess)
    : false

  return (
    <Title
      className={componentClassName}
      level={level}
      editable={editable}
    >
      {isEditable ? editableText : title}
      {children}
    </Title>
  )
}
