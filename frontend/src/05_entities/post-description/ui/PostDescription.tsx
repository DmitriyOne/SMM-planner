import { TPost } from "@/05_entities/post/model/types"
import { FC, PropsWithChildren } from "react"
import Text from "antd/es/typography/Text"
import classNames from "classnames"

import { editableConfig } from "@/06_shared/config"

import styles from "./post-description.module.scss"

type TProps = Pick<TPost, "description"> & {
  className?: string
  isEditable?: boolean
  editableText?: string
  handleEditable?: (text: string) => void
  handleEditableSuccess?: () => void
} & PropsWithChildren

export const PostDescription: FC<TProps> = ({
  className,
  description,
  isEditable,
  editableText,
  handleEditable,
  handleEditableSuccess,
  children,
}) => {
  const componentClassName = classNames(styles.component, className)

  const editable = isEditable
    ? editableConfig(editableText, handleEditable, handleEditableSuccess)
    : false

  return (
    <Text
      className={componentClassName}
      type='secondary'
      editable={editable}
    >
      {isEditable ? editableText : description}
      {children}
    </Text>
  )
}
