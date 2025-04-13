import { FC, PropsWithChildren, use } from "react"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { TagsList } from "../tags-list"

type TProps = {
  getTags: Promise<TTag[]>
  className?: string
  tagClassName?: string
} & PropsWithChildren

export const TagsAsync: FC<TProps> = ({
  getTags,
  className,
  tagClassName,
  children,
}) => {
  const allTags = use(getTags)

  return (
    <TagsList
      tags={allTags}
      className={className}
      tagComponentClassName={tagClassName}
    >
      {children}
    </TagsList>
  )
}
