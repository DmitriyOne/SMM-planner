import { PostEditPage } from "@/02_pages/post-edit"
import { getPost } from "@/05_entities/post/api"

type TParams = { params: Promise<{ id: string }> }

export default async function Page({ params }: TParams) {
  const { id } = await params
  const post = await getPost(id)

  return <PostEditPage post={post} />
}
