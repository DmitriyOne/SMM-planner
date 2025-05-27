import { PostCard } from "@/05_entities/post-card/ui"
import { TPost } from "@/05_entities/post/model/types"
import { FC } from "react"

type TProps = {
  className?: string
  itemClassName?: string
  posts: TPost[]
}

export const PostCardList: FC<TProps> = ({
  className,
  itemClassName,
  posts,
}) => {
  return (
    <div className={className}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          className={itemClassName}
        />
      ))}
    </div>
  )
}
