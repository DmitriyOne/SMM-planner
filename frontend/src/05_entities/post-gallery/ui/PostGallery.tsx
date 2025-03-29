import { TImage } from "@/06_shared/model/types"
import { FC } from "react"
import { Image } from "antd"

import styles from "./post-gallery.module.scss"
import classNames from "classnames"

type TProps = {
  gallery: TImage[]
  componentClassName?: string
}

export const PostGallery: FC<TProps> = ({ gallery, componentClassName }) => {
  const componentClass = classNames(styles.component, componentClassName)

  return (
    <Image
      className={componentClass}
      src={gallery?.[0]?.src}
      alt={gallery?.[0]?.alt}
      width={410}
      height={510}
    />
  )
}
