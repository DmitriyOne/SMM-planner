import { ProfilePage } from "@/02_pages/profile"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.PROFILE}`,
  }
}

export default async function Profile() {
  return <ProfilePage />
}
