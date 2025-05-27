import { AllTagsPage } from "@/02_pages/all-tags"
import { getTags } from "@/05_entities/tags/api"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.TAGS}`,
  }
}

export default async function Tags() {
  const tags = await getTags()

  return <AllTagsPage tags={tags} />
}
