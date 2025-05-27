import { SettingsPage } from "@/02_pages/settings"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.SETTING}`,
  }
}

export default async function Settings() {
  return <SettingsPage />
}
