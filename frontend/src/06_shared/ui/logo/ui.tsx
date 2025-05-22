import Image from "next/image"

import { ActiveLink } from "../active-link"

import { paths } from "@/06_shared/config/routing"

export const Logo = () => {
  return (
    <ActiveLink href={paths.home}>
      <Image
        src='/logo.png'
        alt='Logo'
        width={80}
        height={40}
      />
    </ActiveLink>
  )
}
