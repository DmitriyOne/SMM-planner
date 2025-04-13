import { TTag } from "@/06_shared/ui/tag/model/types"
import { useState } from "react"

export const useManageTags = () => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    console.log("Edit")
    setIsEditing(true)
  }

  const handleCancel = () => {
    console.log("Save")
    setIsEditing(false)
  }

  const handleSave = (tags: TTag[]) => {
    // TODO: call API
    console.log("Save")
    console.log("tags: ", tags)
    setIsEditing(false)
  }

  return {
    isEditing,
    handleEdit,
    handleCancel,
    handleSave,
  }
}
