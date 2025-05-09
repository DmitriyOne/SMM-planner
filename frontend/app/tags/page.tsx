import { AllTagsPage } from "@/02_pages/all-tags"
import { getTags } from "@/05_entities/tags/api"

export async function generateMetadata() {
  return {
    title: "All tags",
  }
}

export default async function Tags() {
  const tags = await getTags()

  return <AllTagsPage tags={tags} />
}
