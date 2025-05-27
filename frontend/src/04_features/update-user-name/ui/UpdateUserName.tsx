"use client"

import { UserMetaItem } from "@/05_entities/user/ui/meta-item"

import { useUpdateUserField } from "@/05_entities/user/model/hooks"

export const UpdateUserName = () => {
  const {
    isLoading,
    isUserContextLoading,
    newValue,
    setNewValue,
    handleSuccess,
  } = useUpdateUserField("name")

  return (
    <UserMetaItem
      title='Name'
      isLoading={isLoading || isUserContextLoading}
      skeletonWidth={120}
      isEditable
      editableValue={newValue}
      handleEditable={setNewValue}
      handleEditableSuccess={handleSuccess}
    />
  )
}
