"use client"

import { FC } from "react"

import { PostTitle } from "@/05_entities/post-title/ui"

import { TPost } from "@/05_entities/post/model/types"
import { LoadingOverlay } from "@/06_shared/ui/loading-overlay"
import { useUpdatePostField } from "@/05_entities/post/model/hooks"

import styles from "./update-post-title.module.scss"
import classNames from "classnames"

type TProps = Pick<TPost, "id" | "title"> & {
  className?: string
}

export const UpdatePostTitle: FC<TProps> = ({ id, title, className }) => {
  const { isLoading, newValue, setNewValue, handleSuccess } =
    useUpdatePostField(id, title, "title")

  const componentClassName = classNames(styles.component, className, {
    [styles.loading]: isLoading,
  })

  return (
    <PostTitle
      className={componentClassName}
      title={title}
      isEditable
      editableText={newValue}
      handleEditable={setNewValue}
      handleEditableSuccess={handleSuccess}
    >
      {isLoading && <LoadingOverlay size='large' />}
    </PostTitle>
  )
}
