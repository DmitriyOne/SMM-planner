import { PostEditPage } from "@/02_pages/post-edit"
import { getPost } from "@/05_entities/post/api"
import { HEAD_TITLE } from "@/06_shared/config/head"

type TParams = { params: Promise<{ id: string }> }

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.POST_UPDATE}`,
  }
}

export default async function Page({ params }: TParams) {
  const { id } = await params
  const post = await getPost(id)

  return <PostEditPage post={post} />
}
