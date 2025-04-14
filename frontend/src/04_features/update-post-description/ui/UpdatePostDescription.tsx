"use client"

import { FC, useState } from "react"

import { TPost } from "@/05_entities/post/model"
import { deletePost } from "@/04_features/delete-post/api"
import { useUpdateData } from "@/06_shared/model/hooks"
import { PostDescription } from "@/05_entities/post-description/ui"
import { LoadingOverlay } from "@/06_shared/ui/loading-overlay"
import classNames from "classnames"

import styles from "./update-post-description.module.scss"

type TProps = Pick<TPost, "description"> & {
  className?: string
}

export const UpdatePostDescription: FC<TProps> = ({
  description,
  className,
}) => {
  const [editableText, setEditableText] = useState(description)
  const { isLoading, handleApiCall } = useUpdateData()

  const handleSuccess = async () => {
    await handleApiCall({
      apiFunction: () => deletePost("7"),
      onErrorCallback: () => setEditableText(description),
    })
  }

  const componentClassName = classNames(styles.component, className, {
    [styles.loading]: isLoading,
  })

  return (
    <PostDescription
      className={componentClassName}
      description={description}
      isEditable
      editableText={editableText}
      handleEditable={setEditableText}
      handleEditableSuccess={handleSuccess}
    >
      {isLoading && <LoadingOverlay size='large' />}
    </PostDescription>
  )
}
