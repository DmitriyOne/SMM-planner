import { FC } from "react"
import Text from "antd/es/typography/Text"
import Skeleton from "react-loading-skeleton"
import classNames from "classnames"

import { editableConfig } from "@/06_shared/config"

import styles from "./meta-item.module.scss"

type TProps = {
  title: string
  data?: string | number
  isLoading?: boolean
  skeletonWidth?: number
  skeletonHeight?: number
  className?: string
  isEditable?: boolean
  editableValue?: string
  handleEditable?: (title: string) => void
  handleEditableSuccess?: () => void
}

export const UserMetaItem: FC<TProps> = ({
  title,
  data,
  isLoading,
  skeletonWidth = 30,
  skeletonHeight = 20,
  className,
  isEditable,
  editableValue,
  handleEditable,
  handleEditableSuccess,
}) => {
  const editable = isEditable
    ? editableConfig(editableValue, handleEditable, handleEditableSuccess)
    : false

  const componentClassName = classNames(styles.component, className)
  return (
    <Text className={componentClassName}>
      {title}:&nbsp;
      {isLoading ? (
        <Skeleton
          containerClassName={styles.skeletonContainer}
          className={styles.skeleton}
          width={skeletonWidth}
          height={skeletonHeight}
        />
      ) : (
        <Text editable={editable}>{isEditable ? editableValue : data}</Text>
      )}
    </Text>
  )
}
