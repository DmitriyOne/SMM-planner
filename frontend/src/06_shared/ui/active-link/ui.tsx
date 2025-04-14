"use client"

import Link, { LinkProps } from "next/link"
import classNames from "classnames"
import { AnchorHTMLAttributes, PropsWithChildren } from "react"
import { usePathname } from "next/navigation"

import styles from "./style.module.scss"

type TProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren & {
    activeClassName?: string
  }

export const ActiveLink = ({ children, activeClassName, ...props }: TProps) => {
  const pathname = usePathname()

  const isActive =
    pathname === props.href ||
    pathname === props.as ||
    pathname.replace(/\//g, "") === props.href.toString().replace(/\//g, "")

  const linkClass = classNames(props.className, {
    [styles.component]: isActive,
    [activeClassName ?? ""]: isActive,
  })

  if (isActive) {
    return <span className={linkClass}>{children}</span>
  }

  return (
    <Link
      className={linkClass}
      {...props}
    >
      {children}
    </Link>
  )
}
