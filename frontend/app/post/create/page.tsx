import { PostCreatePage } from "@/02_pages/post-create"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.POST_CREATE}`,
  }
}

export default async function Page() {
  return <PostCreatePage />
}
