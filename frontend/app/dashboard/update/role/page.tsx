import { UpdateRolePage } from "@/02_pages/update-role"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.UPDATE_ROLE}`,
  }
}

export default async function UpdateRole() {
  return <UpdateRolePage />
}
