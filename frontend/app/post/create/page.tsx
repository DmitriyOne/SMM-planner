import { PostCreatePage } from "@/02_pages/post-create"

export async function generateMetadata() {
  return {
    title: "Create post",
  }
}

export default async function Page() {
  return <PostCreatePage />
}
