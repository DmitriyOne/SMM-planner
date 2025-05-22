import "@ant-design/v5-patch-for-react-19"

import { Geist, Geist_Mono } from "next/font/google"
import { ReactNode } from "react"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Metadata } from "next"
import { HEAD_DESCRIPTION, HEAD_TITLE } from "@/06_shared/config/head"

import { MainLayout } from "@/01_app/main-layout"

import "./globals.css"
import "react-loading-skeleton/dist/skeleton.css"

export type TRootLayoutProps = Readonly<{
  children: ReactNode
}>

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: HEAD_TITLE.DEFAULT,
  description: HEAD_DESCRIPTION.DEFAULT,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
}

export default async function RootLayout({ children }: TRootLayoutProps) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <MainLayout>{children}</MainLayout>
        </AntdRegistry>
      </body>
    </html>
  )
}
