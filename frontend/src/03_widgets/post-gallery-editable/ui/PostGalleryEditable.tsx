"use client"

import classNames from "classnames"
import { PostGallery } from "@/05_entities/post-gallery/ui"

import { TImage } from "@/06_shared/model/types"

import { FC, useState } from "react"
import { PostGalleryControls } from "@/04_features/post-gallery-controls/ui"

import styles from "./post-gallery-editable.module.scss"

type TProps = {
  gallery: TImage[]
  galleryClassName?: string
  controlsClassName?: string
}

export const PostGalleryEditable: FC<TProps> = ({
  gallery,
  galleryClassName,
  controlsClassName,
}) => {
  const [newGallery, setNewGallery] = useState(gallery)

  const controlsClass = classNames(styles.controls, controlsClassName)

  return (
    <>
      <PostGallery
        gallery={newGallery}
        className={galleryClassName}
      />
      <PostGalleryControls
        gallery={newGallery}
        className={controlsClass}
        setNewGallery={setNewGallery}
      />
    </>
  )
}
