import { FC } from "react"

type TProps = {
  title: string
  className?: string
}

export const DataNoFound: FC<TProps> = ({ className, title }) => {
  return <p className={className}>{title} not found</p>
}
