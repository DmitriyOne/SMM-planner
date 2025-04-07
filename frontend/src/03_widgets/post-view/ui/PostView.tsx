import { TPost } from "@/05_entities/post/model"
import { FC } from "react"

import { Col, Row } from "antd"
import { PostGallery } from "@/05_entities/post-gallery/ui"
import { TImage } from "@/06_shared/model/types"

import { PostTitle } from "@/05_entities/post-title/ui"
import { PostDescription } from "@/05_entities/post-description/ui"
import { PostStatus } from "@/05_entities/post-status/ui"
import { PostDate } from "@/05_entities/post-date/ui"
import { PostAuthor } from "@/05_entities/post-author/ui"
import { DeletePost } from "@/04_features/delete-post/ui"
import { LinkEdit } from "@/06_shared/ui/link-edit/ui"
import { paths } from "@/06_shared/config/routing"

import { TagsStatic } from "@/05_entities/tags/ui/tags-static"

import styles from "./post-view.module.scss"

type TProps = {
  post: TPost
}

export const PostViewWidget: FC<TProps> = ({ post }) => {
  const gallery: TImage[] = [
    {
      src: post.image,
      alt: post.title,
    },
  ]

  const postIdString = post.id.toString()

  return (
    <>
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

          <div className={styles.bottomButtons}>
            <DeletePost
              className={styles.delete}
              postId={postIdString}
            />
            <LinkEdit
              className={styles.edit}
              redirectPath={paths.post_edit(postIdString)}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}
