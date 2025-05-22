import { LogoutPage } from "@/02_pages/logout"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.LOGIN}`,
  }
}

export default async function Profile() {
  return <LogoutPage />
}
