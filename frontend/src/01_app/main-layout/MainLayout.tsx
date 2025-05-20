import { FC, PropsWithChildren } from "react"

import { Layout } from "antd"
import { TUser } from "@/05_entities/user/model/types"

import { Header } from "@/03_widgets/header/ui"
import { Footer } from "@/03_widgets/footer/ui"

import styles from "./main-layout.module.scss"

type TProps = PropsWithChildren & {
  user: TUser | null
}

export const MainLayout: FC<TProps> = ({ user, children }) => {
  const authorized = user !== null && user.id !== null

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        flexDirection: "column",
      }}
    >
      <Header
        authorized={authorized}
        username={user?.name}
        role={user?.role}
      />
      <main className={styles.main}>{children}</main>
      <Footer />
    </Layout>
  )
}
