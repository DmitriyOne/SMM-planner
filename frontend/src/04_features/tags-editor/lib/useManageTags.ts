import { updatePost } from "@/05_entities/post/api"
import { getToken } from "@/06_shared/api/auth"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { message } from "antd"
import { useState } from "react"
import { TAGS_UPDATED_SUCCESS_MSG } from "../config"

export const useManageTags = (postId: number) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = async (tags: TTag[]) => {
    const token = await getToken()
    const tagsOnlyTitles = tags.map((tag) => ({ title: tag.title }))
    await updatePost(token, postId, { tags: tagsOnlyTitles })
    message.success(TAGS_UPDATED_SUCCESS_MSG)
    setIsEditing(false)
  }

  return {
    isEditing,
    handleEdit,
    handleCancel,
    handleSave,
  }
}
