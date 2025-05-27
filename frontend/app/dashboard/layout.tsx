import { ReactNode } from "react"

import { DashboardMainLayout } from "@/01_app/dashboard-layout"
import { UserProvider } from "@/05_entities/user/model/context"

export type TDashboardLayoutProps = Readonly<{
  children: ReactNode
}>

export default function DashboardLayout({
  children,
}: TDashboardLayoutProps) {

  return (
    <UserProvider>
      <DashboardMainLayout>{children}</DashboardMainLayout>
    </UserProvider>
  )
}
