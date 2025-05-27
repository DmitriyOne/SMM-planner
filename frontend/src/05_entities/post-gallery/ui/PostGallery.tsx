import { TImage } from "@/06_shared/model/types"
import { FC } from "react"
import { Image } from "antd"

import classNames from "classnames"
import { isValidArray } from "@/06_shared/model/utils"

import styles from "./post-gallery.module.scss"

type TProps = {
  gallery: TImage[]
  className?: string
}

export const PostGallery: FC<TProps> = ({ gallery, className }) => {
  const componentClass = classNames(styles.component, className)

  const imageSrc =
    isValidArray(gallery) && gallery[0].src
      ? gallery[0].src
      : "/placeholder.jpg"

  return (
    <Image
      className={componentClass}
      src={imageSrc}
      alt={gallery?.[0]?.alt}
      width={410}
      height={510}
    />
  )
}
