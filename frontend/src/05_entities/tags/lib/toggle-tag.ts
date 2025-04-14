import { TTag } from "@/06_shared/ui/tag/model/types"

export const toggleTag = (selectedTags: TTag[], tag: TTag): TTag[] => {
  const isSelected = selectedTags.some((t) => t.id === tag.id)
  return isSelected
    ? selectedTags.filter((t) => t.id !== tag.id)
    : [...selectedTags, tag]
}
