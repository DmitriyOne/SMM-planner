import { TagCreatePage } from "@/02_pages/tag-create"

export async function generateMetadata() {
  return {
    title: "Create tag",
  }
}

export default async function Page() {
  return <TagCreatePage />
}
