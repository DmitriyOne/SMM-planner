import { TPost } from "@/05_entities/post/model/types"
import { FC } from "react"
import { Container } from "@/06_shared/ui/container"
import { Col, Row } from "antd"
import { PostGallery } from "@/05_entities/post-gallery/ui"

import { PostTitle } from "@/05_entities/post-title/ui"
import { PostDescription } from "@/05_entities/post-description/ui"
import { PostStatus } from "@/05_entities/post-status/ui"
import { PostDate } from "@/05_entities/post-date/ui"
import { PostAuthor } from "@/05_entities/post-author/ui"

import { TagsStatic } from "@/05_entities/tags/ui/tags-static"

import { PostReadControl } from "@/03_widgets/post-read-control/ui"
import { Breadcrumbs } from "@/03_widgets/breadcrumbs/ui"
import { NotAllowToEditAlert } from "@/04_features/not-allow-to-edit-alert/ui"
import { PostComments } from "@/03_widgets/post-comments/ui"

import styles from "./post-read.module.scss"
import { mapPostToGallery } from "@/06_shared/lib/other"

type TProps = {
  post: TPost
}

export const PostReadPage: FC<TProps> = ({ post }) => {
  if (!post) {
    return <></>
  }

  const gallery = mapPostToGallery(post)

  return (
    <Container className={styles.component}>
      <NotAllowToEditAlert />
      <Breadcrumbs
        type='post_read'
        params={{ postId: post.id.toString() }}
      />
      <Row wrap={false}>
        <Col
          flex='400px'
          className={styles.colLeft}
        >
          <PostGallery gallery={gallery} />
        </Col>
        <Col
          flex='auto'
          className={styles.colRight}
        >
          <TagsStatic
            className={styles.tags}
            tags={post.tags}
          />
          <PostTitle title={post.title} />
          <PostDescription
            className={styles.description}
            description={post.description}
          />
          <PostStatus
            question='Is the post published?'
            status={post.isPublish}
          />
          <PostStatus
            className={styles.statusApproved}
            question='Is the post approved?'
            status={post.isApproved}
          />
          <PostAuthor
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
          <PostReadControl post={post} />
        </Col>
      </Row>
      <Row>
        <Col className={styles.colComments}>
          <PostComments postId={post.id} />
        </Col>
      </Row>
    </Container>
  )
}
