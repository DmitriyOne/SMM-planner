import { PropsWithChildren } from "react"

import { Layout } from "antd"

import { Header } from "@/03_widgets/header/ui"
import { Footer } from "@/03_widgets/footer/ui"

import styles from "./main-layout.module.scss"

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </Layout>
  )
}
