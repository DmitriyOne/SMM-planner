"use client"

import { FC } from "react"
import classNames from "classnames"

import { TPost } from "@/05_entities/post/model/types"
import { PostDescription } from "@/05_entities/post-description/ui"
import { LoadingOverlay } from "@/06_shared/ui/loading-overlay"
import { useUpdatePostField } from "@/05_entities/post/model/hooks"

import styles from "./update-post-description.module.scss"

type TProps = Pick<TPost, "id" | "description"> & {
  className?: string
}

export const UpdatePostDescription: FC<TProps> = ({
  id,
  description,
  className,
}) => {
  const { isLoading, newValue, setNewValue, handleSuccess } =
    useUpdatePostField(id, description, "description")

  const componentClassName = classNames(styles.component, className, {
    [styles.loading]: isLoading,
  })

  return (
    <PostDescription
      className={componentClassName}
      description={description}
      isEditable
      editableText={newValue}
      handleEditable={setNewValue}
      handleEditableSuccess={handleSuccess}
    >
      {isLoading && <LoadingOverlay size='large' />}
    </PostDescription>
  )
}
