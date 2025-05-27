"use client"

import { FC } from "react"
import Text from "antd/es/typography/Text"

import styles from "./update-tag-title.module.scss"
import classNames from "classnames"
import { useUpdateTagTitle } from "../model/hooks"

type TProps = {
  tagId: string
  title: string
}

export const UpdateTagTitle: FC<TProps> = ({ tagId, title }) => {
  const { isLoading, newValue, setNewValue, handleSuccess } = useUpdateTagTitle(
    tagId,
    title,
  )

  const componentClassName = classNames(styles.component, {
    [styles.loading]: isLoading,
  })

  return (
    <Text
      className={componentClassName}
      editable={{
        text: newValue,
        onChange: setNewValue,
        onEnd: handleSuccess,
        tooltip: "click to edit",
      }}
    >
      {newValue}
    </Text>
  )
}
