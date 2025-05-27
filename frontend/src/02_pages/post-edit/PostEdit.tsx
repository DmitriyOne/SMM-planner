import { TPost } from "@/05_entities/post/model/types"
import { FC } from "react"
import { Container } from "@/06_shared/ui/container"
import { Col, Row } from "antd"
import { TImage } from "@/06_shared/model/types"

import { PostDate } from "@/05_entities/post-date/ui"
import { PostAuthor } from "@/05_entities/post-author/ui"

import { UpdatePostTitle } from "@/04_features/update-post-title/ui"
import { UpdatePostDescription } from "@/04_features/update-post-description/ui"

import { PostStatusControl } from "@/03_widgets/post-status-control/ui"
import { TagsPanelEditable } from "@/03_widgets/tags-panel-editable/ui"

import { PostGalleryEditable } from "@/03_widgets/post-gallery-editable/ui"
import { Breadcrumbs } from "@/03_widgets/breadcrumbs/ui"

import styles from "./post-edit.module.scss"

type TProps = {
  post: TPost
}

export const PostEditPage: FC<TProps> = ({ post }) => {
  if (!post) {
    return <></>
  }

  // TODO: create utils
  const gallery: TImage[] = [
    {
      src: post.image ?? "",
      alt: post.title,
    },
  ]

  return (
    <Container className={styles.component}>
      <Breadcrumbs
        type='post_edit'
        params={{ postId: post.id.toString() }}
      />
      <Row wrap={false}>
        <Col
          flex='400px'
          className={styles.colLeft}
        >
          <PostGalleryEditable
            postId={post.id}
            gallery={gallery}
          />
        </Col>
        <Col flex='auto'>
          <TagsPanelEditable
            postId={post.id}
            tags={post.tags}
          />
          <UpdatePostTitle
            id={post.id}
            title={post.title}
          />
          <UpdatePostDescription
            id={post.id}
            className={styles.description}
            description={post.description}
          />
          <PostStatusControl post={post} />
          <PostAuthor
            componentClassName={styles.author}
            title='Author: '
            name={post.author?.name}
          />
          <PostDate
            title='Created at:'
            date={post.createdAt}
          />
          <PostDate
            title='Updated at:'
            date={post.updatedAt}
          />
        </Col>
      </Row>
    </Container>
  )
}
