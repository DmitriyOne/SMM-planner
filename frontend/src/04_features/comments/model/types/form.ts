import { TComment } from "@/05_entities/comment/model/types"

export type TActionState = {
  success?: boolean
  comment?: TComment | null
  errors?: {
    comment?: string[]
    api?: string[]
  }
}
