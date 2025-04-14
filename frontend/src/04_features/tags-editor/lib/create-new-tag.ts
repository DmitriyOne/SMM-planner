import { TTag } from "@/06_shared/ui/tag/model/types"

export const createNewTag = (formData: FormData): TTag => {
  const title = formData.get("new-tag") as string
  // TODO: add api call
  return {
    id: Date.now(),
    title,
    authorId: "1",
    author: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    posts: [],
  }
}
