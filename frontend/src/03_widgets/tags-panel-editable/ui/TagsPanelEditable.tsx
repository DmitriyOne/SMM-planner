"use client"

import { useManageTags } from "@/04_features/tags-editor/lib"
import { TagsEditor } from "@/04_features/tags-editor/ui"
import { TagsStatic } from "@/05_entities/tags/ui/tags-static"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { FC, useState } from "react"

type TProps = {
  tags: TTag[]
}

export const TagsPanelEditable: FC<TProps> = ({ tags }) => {
  const [selectedTags, setSelectedTags] = useState<TTag[]>(tags)
  const { isEditing, handleEdit, handleCancel, handleSave } = useManageTags()

  return (
    <div>
      {isEditing ? (
        <TagsEditor
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          onCancel={handleCancel}
          onSave={() => handleSave(selectedTags)}
        />
      ) : (
        <>
          <TagsStatic
            tags={selectedTags}
            onToggleEdit={handleEdit}
            isEditable
          />
        </>
      )}
    </div>
  )
}
