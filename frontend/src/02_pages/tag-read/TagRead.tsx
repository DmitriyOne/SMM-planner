import { FC, Suspense } from "react"
import { TTag } from "@/06_shared/ui/tag/model/types"

import { Container } from "@/06_shared/ui"
import { Breadcrumbs } from "@/03_widgets/breadcrumbs/ui"
import { Divider } from "antd"
import Title from "antd/es/typography/Title"
import { formatIsoToDatetime } from "@/06_shared/model/utils"
import { TagReadControl } from "@/03_widgets/tag-read-control/ui"

import { TagPostList } from "@/04_features/tag-post-list/ui"
import { getPostsByTagId } from "@/05_entities/post/api"
import { PostCardListSkeleton } from "@/03_widgets/post-card-list/ui"

import styles from "./tag-read.module.scss"

type TProps = {
  tag: TTag
}

export const TagReadPage: FC<TProps> = ({ tag }) => {
  return (
    <Container className={styles.component}>
      <Breadcrumbs
        type='tag_read'
        params={{ tagId: tag.id.toString() }}
      />
      <Title className={styles.title}>Tag: {tag.title}</Title>
      <Divider />
      <div>Author: {tag.author.name}</div>
      <div>Created at: {formatIsoToDatetime(tag.createdAt)}</div>
      <div>Updated at: {formatIsoToDatetime(tag.updatedAt)}</div>
      <TagReadControl tag={tag} />
      <Divider />
      <Title level={3}>The tag added to {tag.posts?.length} posts</Title>
      <Suspense fallback={<PostCardListSkeleton />}>
        <TagPostList getPostsByTagId={getPostsByTagId(tag.id.toString())} />
      </Suspense>
    </Container>
  )
}
