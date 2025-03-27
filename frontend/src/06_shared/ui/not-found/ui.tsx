import { FC } from "react"

type TProps = {
  title: string
}

export const DataNoFound: FC<TProps> = ({ title }) => {
  return <p>{title} not found</p>
}
