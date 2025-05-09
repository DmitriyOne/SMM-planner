/* eslint-disable no-console */
import { updatePost } from "@/05_entities/post/api"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { useState } from "react"

export const useManageTags = (postId: number) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    console.log("Edit")
    setIsEditing(true)
  }

  const handleCancel = () => {
    console.log("Save")
    setIsEditing(false)
  }

  const handleSave = async (tags: TTag[]) => {
    await updatePost(postId, { tags: tags })
    setIsEditing(false)
  }

  return {
    isEditing,
    handleEdit,
    handleCancel,
    handleSave,
  }
}
