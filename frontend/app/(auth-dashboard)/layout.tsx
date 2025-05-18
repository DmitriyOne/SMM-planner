import { UserProvider } from "@/05_entities/user/model/context"
import { JSX, ReactNode } from "react"

export type TProps = Readonly<{
  children: ReactNode
}>

export default function AuthDashboardLayout({ children }: TProps): JSX.Element {
  return <UserProvider>{children}</UserProvider>
}
