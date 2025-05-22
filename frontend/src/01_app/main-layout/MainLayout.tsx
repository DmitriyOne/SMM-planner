import { FC, PropsWithChildren } from "react"

import { Layout } from "antd"

import { Header } from "@/03_widgets/header/ui"
import { Footer } from "@/03_widgets/footer/ui"

import styles from "./main-layout.module.scss"

type TProps = PropsWithChildren & {}

export const MainLayout: FC<TProps> = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        flexDirection: "column",
      }}
    >
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </Layout>
  )
}
