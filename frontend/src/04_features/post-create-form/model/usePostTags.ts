import { useEffect, useState } from "react"
import { getTags } from "@/05_entities/tags/api"
import { toggleTag } from "@/05_entities/tags/lib"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { useLoading } from "@/06_shared/model/hooks"
import { isValidArray } from "@/06_shared/model/utils"

export const usePostTags = () => {
  const [tags, setTags] = useState<TTag[]>([])
  const [selectedTags, setSelectedTags] = useState<TTag[]>([])
  const { isLoading, startLoading, stopLoading } = useLoading(true)

  useEffect(() => {
    if (!isValidArray(tags)) {
      startLoading()
      getTags()
        .then((tags) => setTags(tags))
        .finally(stopLoading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  const onToggleTag = (tag: TTag) => {
    setSelectedTags(toggleTag(selectedTags, tag))
  }

  const onRemoveSelectedTags = () => {
    setSelectedTags([])
  }

  return {
    tags,
    selectedTags,
    isTagsLoading: isLoading,
    onToggleTag,
    onRemoveSelectedTags,
  }
}
