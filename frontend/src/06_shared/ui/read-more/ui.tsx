import Link from "next/link"
import { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from "react"

type TProps = PropsWithChildren & {
  href: string
  componentClassName?: string
  target?: HTMLAttributeAnchorTarget
}

export const ReadMore: FC<TProps> = ({
  href,
  target,
  componentClassName,
  children,
}) => {
  return (
    <Link
      className={componentClassName}
      href={href}
      target={target}
    >
      {children ?? "More"}
    </Link>
  )
}
