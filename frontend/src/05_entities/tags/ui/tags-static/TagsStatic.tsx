import { FC, PropsWithChildren } from "react"
import { TTag } from "@/06_shared/ui/tag/model/types"

import { EditableTooltip } from "@/06_shared/ui/editable-tooltip"
import { TagsList } from "../tags-list"
import { EIconType } from "@/06_shared/config/enums"

type TProps = {
  tags: TTag[]
  className?: string
  tagClassName?: string
  buttonTooltipClassName?: string
  isEditable?: boolean
  onToggleEdit?: () => void
  getIconType?: (tag: TTag) => EIconType
  onTagClick?: (tag: TTag) => void
} & PropsWithChildren

export const TagsStatic: FC<TProps> = ({
  tags,
  className,
  tagClassName,
  buttonTooltipClassName,
  isEditable,
  onToggleEdit,
  children,
  getIconType,
  onTagClick,
}) => {
  return (
    <TagsList
      tags={tags}
      className={className}
      tagComponentClassName={tagClassName}
      getIconType={getIconType}
      onTagClick={onTagClick}
    >
      {children}
      {isEditable && (
        <EditableTooltip
          buttonClassName={buttonTooltipClassName}
          handleEditable={onToggleEdit}
        />
      )}
    </TagsList>
  )
}
