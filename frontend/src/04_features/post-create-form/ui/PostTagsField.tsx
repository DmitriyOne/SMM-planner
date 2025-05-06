import Text from "antd/es/typography/Text"

import { TagsStatic } from "@/05_entities/tags/ui/tags-static"

import styles from "./post-create-form.module.scss"
import { getTagIconType } from "@/05_entities/tags/lib"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { FC } from "react"

type TProps = {
  tags: TTag[]
  selectedTags: TTag[]
  isLoading: boolean
  onToggleTag: (tag: TTag) => void
}

export const PostTagsField: FC<TProps> = ({
  tags,
  selectedTags,
  isLoading,
  onToggleTag,
}) => {
  return (
    <div className={styles.tagsContainer}>
      <Text className={styles.tagsLabel}>Tags</Text>
      <TagsStatic
        className={styles.tags}
        tags={tags}
        getIconType={(tag) => getTagIconType(selectedTags, tag)}
        onTagClick={onToggleTag}
        isLoading={isLoading}
      />
    </div>
  )
}
