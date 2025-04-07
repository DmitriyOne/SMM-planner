import { FC } from "react"
import { TTag } from "@/06_shared/ui/tag/model/types"

import { EditableTooltip } from "@/06_shared/ui/editable-tooltip"
import { TagsList } from "../tags-list"

type TProps = {
  tags: TTag[]
  className?: string
  tagClassName?: string
  buttonTooltipClassName?: string
  isEditable?: boolean
  onToggleEdit?: () => void
}

export const TagsStatic: FC<TProps> = ({
  tags,
  className,
  tagClassName,
  buttonTooltipClassName,
  isEditable,
  onToggleEdit,
}) => {
  return (
    <TagsList
      tags={tags}
      className={className}
      tagComponentClassName={tagClassName}
    >
      {isEditable && (
        <EditableTooltip
          buttonClassName={buttonTooltipClassName}
          handleEditable={onToggleEdit}
        />
      )}
    </TagsList>
  )
}
