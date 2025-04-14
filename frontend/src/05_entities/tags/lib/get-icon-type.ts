import { EIconType } from "@/06_shared/config/enums"
import { TTag } from "@/06_shared/ui/tag/model/types"

export const getTagIconType = (selectedTags: TTag[], tag: TTag): EIconType => {
  return selectedTags.some((t) => t.id === tag.id)
    ? EIconType.DELETE
    : EIconType.ADD
}
