import { FC, use } from "react"
import { TTag } from "@/05_entities/tag/model/types"
import { Tag } from "@/05_entities/tag/ui"
import { isValidArray } from "@/06_shared/model/utils"
import { DataNoFound } from "@/06_shared/ui"

type TProps = {
  getAllTags: Promise<TTag[]>
}

export const Tags: FC<TProps> = ({ getAllTags }) => {
  const tags = use(getAllTags)

  if (!isValidArray(tags)) {
    return <DataNoFound title='Tags' />
  }

  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag.id}>{tag.title}</Tag>
      ))}
    </>
  )
}
