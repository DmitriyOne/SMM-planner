import { FC, PropsWithChildren } from "react"
import { TTag } from "@/06_shared/ui/tag/model/types"

import { EditableTooltip } from "@/06_shared/ui/editable-tooltip"
import { TagsList } from "../tags-list"
import { EIconType } from "@/06_shared/config/enums"

type TProps = {
  isLoading?: boolean
  tags: TTag[]
  className?: string
  tagClassName?: string
  buttonTooltipClassName?: string
  isEditable?: boolean
  onToggleEdit?: () => void
  getIconType?: (tag: TTag) => EIconType
  onTagClick?: (tag: TTag) => void
  isLink?: boolean
} & PropsWithChildren

export const TagsStatic: FC<TProps> = ({
  isLoading,
  tags,
  className,
  tagClassName,
  buttonTooltipClassName,
  isEditable,
  onToggleEdit,
  children,
  getIconType,
  onTagClick,
  isLink,
}) => {
  return (
    <TagsList
      tags={tags}
      className={className}
      isLoading={isLoading}
      tagComponentClassName={tagClassName}
      getIconType={getIconType}
      onTagClick={onTagClick}
      isLink={isLink}
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
