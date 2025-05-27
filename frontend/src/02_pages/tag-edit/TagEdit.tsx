import { Breadcrumbs } from "@/03_widgets/breadcrumbs/ui"
import Title from "antd/es/typography/Title"
import { TTag } from "@/06_shared/ui/tag/model/types"
import { FC } from "react"
import { Container } from "@/06_shared/ui"
import { Divider } from "antd"
import { UpdateTagTitle } from "@/04_features/update-tag-title/ui"

import styles from "./tag-edit.module.scss"

type TProps = {
  tag: TTag
}

export const TagEditPage: FC<TProps> = ({ tag }) => {
  return (
    <Container className={styles.component}>
      <Breadcrumbs
        type='tag_edit'
        params={{ tagId: tag.id.toString() }}
      />
      <Title className={styles.title}>
        Change the title of the tag
      </Title>
      <Divider />
      <UpdateTagTitle
        tagId={tag.id.toString()}
        title={tag.title}
      />
    </Container>
  )
}
