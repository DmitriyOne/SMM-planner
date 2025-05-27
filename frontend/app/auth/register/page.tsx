import { RegisterPage } from "@/02_pages/register"
import { HEAD_TITLE } from "@/06_shared/config/head"

export async function generateMetadata() {
  return {
    title: `${HEAD_TITLE.DEFAULT} | ${HEAD_TITLE.REGISTER}`,
  }
}

export default async function Page() {
  return <RegisterPage />
}
