import { PostCard } from "@/05_entities/post-card/ui"
import { TPost } from "@/05_entities/post/model"
import { FC } from "react"

type TProps = {
  posts: TPost[]
}

export const PostCardList: FC<TProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}
