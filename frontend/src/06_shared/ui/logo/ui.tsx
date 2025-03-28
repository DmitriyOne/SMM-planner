"use client"

import { usePathname } from "next/navigation"

import { ActiveLink } from "../active-link"

import { LogoSVG } from "./logo-svg"

import { paths } from "@/06_shared/config/routing"

export const Logo = () => {
  const pathname = usePathname()
  return (
    <ActiveLink href='/'>
      <LogoSVG isCurrentPath={pathname === paths.feed} />
    </ActiveLink>
  )
}
