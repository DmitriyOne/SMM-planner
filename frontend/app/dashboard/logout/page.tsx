import { LogoutPage } from "@/02_pages/logout"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.LOGOUT}`,
  }
}

export default async function Logout() {
  return <LogoutPage />
}
