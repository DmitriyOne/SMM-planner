import { TagReadPage } from "@/02_pages/tag-read"
import { getTagById, getTags } from "@/05_entities/tags/api"
import { HEAD_TITLE } from "@/06_shared/config/head"
import { isNumeric } from "@/06_shared/lib/other"
import { notFound } from "next/navigation"

type TParams = { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map((post) => ({ id: String(post.id) }))
}

export async function generateMetadata({ params }: TParams) {
  const { id } = await params
  if (!isNumeric(id)) return {}

  const tag = await getTagById(id)

  if (!tag) return notFound()

  return {
    title: `${HEAD_TITLE.DEFAULT} | ${tag.title}`,
  }
}

export default async function Tag({ params }: TParams) {
  const { id } = await params
  if (!isNumeric(id)) return notFound()

  const tag = await getTagById(id)

  if (!tag) return notFound()

  return <TagReadPage tag={tag} />
}
