import { Breadcrumbs } from "@/03_widgets/breadcrumbs/ui"
import { TagsStatic } from "@/05_entities/tags/ui/tags-static"
import { Container } from "@/06_shared/ui"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { FC } from "react"

import styles from "./all-tags.module.scss"

type TProps = {
  tags: TTag[]
}

export const AllTagsPage: FC<TProps> = ({ tags }) => {
  return (
    <Container className={styles.component}>
      <Breadcrumbs
        type='tags'
        params={{ allTags: true }}
      />
      <TagsStatic
        className={styles.tagsContainer}
        tags={tags}
        tagClassName={styles.tag}
      />
    </Container>
  )
}
