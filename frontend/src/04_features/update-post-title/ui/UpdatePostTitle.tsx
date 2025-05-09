"use client"

import { FC, useState } from "react"

import { PostTitle } from "@/05_entities/post-title/ui"

import { TPost } from "@/05_entities/post/model"
import { useUpdateData } from "@/06_shared/model/hooks"
import { LoadingOverlay } from "@/06_shared/ui/loading-overlay"

import styles from "./update-post-title.module.scss"
import classNames from "classnames"
import { updatePost } from "@/05_entities/post/api"

type TProps = Pick<TPost, "id" | "title"> & {
  className?: string
}

export const UpdatePostTitle: FC<TProps> = ({ id, title, className }) => {
  const [editableText, setEditableText] = useState(title)
  const { isLoading, handleApiCall } = useUpdateData()

  const handleSuccess = async () => {
    await handleApiCall({
      apiFunction: () => updatePost(id, { title: editableText }),
      onErrorCallback: () => setEditableText(title),
    })
  }

  const componentClassName = classNames(styles.component, className, {
    [styles.loading]: isLoading,
  })

  return (
    <PostTitle
      className={componentClassName}
      title={title}
      isEditable
      editableText={editableText}
      handleEditable={setEditableText}
      handleEditableSuccess={handleSuccess}
    >
      {isLoading && <LoadingOverlay size='large' />}
    </PostTitle>
  )
}
