import { TPost } from "@/05_entities/post/model/types"
import { TImage } from "@/06_shared/model/types"

export const mapPostToGallery = (post: TPost): TImage[] => {
  return [
    {
      src: post.image ?? "",
      alt: post.title,
    },
  ]
}
