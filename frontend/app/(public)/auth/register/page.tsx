import { RegisterPage } from "@/02_pages/register"

export async function generateMetadata() {
  return {
    title: "Register",
  }
}

export default async function Page() {
  return <RegisterPage />
}
