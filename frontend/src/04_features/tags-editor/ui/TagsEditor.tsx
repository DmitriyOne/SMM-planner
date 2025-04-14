import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { SaveCancelForm } from "@/06_shared/ui/save-cancel-form"
import { TagCreate } from "@/06_shared/ui/tag-create"
import { SkeletonTags } from "@/05_entities/tags/ui/tags-skeleton"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { getTags } from "@/05_entities/tags/api"
import { TagsStatic } from "@/05_entities/tags/ui/tags-static"
import { useLoading } from "@/06_shared/model/hooks"
import { isValidArray } from "@/06_shared/model/utils"
import { InputSubmitForm } from "@/06_shared/ui"
import { toggleTag, getTagIconType } from "@/05_entities/tags/lib"
import { createNewTag } from "../lib"

import styles from "./tags-editor.module.scss"

type TProps = {
  selectedTags: TTag[]
  setSelectedTags: Dispatch<SetStateAction<TTag[]>>
  onCancel: () => void
  onSave: () => void
}

export const TagsEditor: FC<TProps> = ({
  selectedTags,
  setSelectedTags,
  onCancel,
  onSave,
}) => {
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false)
  const { isLoading, stopLoading } = useLoading(true)
  const [tags, setTags] = useState<TTag[]>([])

  useEffect(() => {
    if (!isValidArray(tags)) {
      getTags()
        .then((tags) => setTags(tags))
        .finally(stopLoading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggle = (tag: TTag) => {
    setSelectedTags(toggleTag(selectedTags, tag))
    setIsCreatingNewTag(false)
  }

  const handleSubmit = (formData: FormData) => {
    const newTag = createNewTag(formData)
    setTags((prev) => [...prev, newTag])
    setSelectedTags((prev) => [...prev, newTag])
    setIsCreatingNewTag(false)
  }

  return (
    <div className={styles.component}>
      {isLoading ? (
        <SkeletonTags />
      ) : (
        <>
          <TagsStatic
            tags={tags}
            getIconType={(tag) => getTagIconType(selectedTags, tag)}
            onTagClick={handleToggle}
          >
            {isCreatingNewTag ? (
              <InputSubmitForm
                inputId='new-tag'
                onSubmit={handleSubmit}
              />
            ) : (
              <TagCreate
                onClick={() => {
                  setIsCreatingNewTag(true)
                  console.log("Create tag")
                }}
              />
            )}
          </TagsStatic>
          <SaveCancelForm
            handleCancel={onCancel}
            handleSave={onSave}
          />
        </>
      )}
    </div>
  )
}
