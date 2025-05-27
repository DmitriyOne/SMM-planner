import { TagCreatePage } from "@/02_pages/tag-create"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.TAG_CREATE}`,
  }
}

export default async function Page() {
  return <TagCreatePage />
}
