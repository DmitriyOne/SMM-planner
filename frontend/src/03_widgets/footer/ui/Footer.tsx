"use client"

import { Footer as AntFooter } from "antd/es/layout/layout"

export const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center", backgroundColor: "#fff" }}>
      SMM planner ©{new Date().getFullYear()} Created by DmitryF
    </AntFooter>
  )
}
