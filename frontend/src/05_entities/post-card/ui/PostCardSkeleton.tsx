import { Card } from "antd"
import { CARD_STYLES } from "../config"
import classNames from "classnames"
import Skeleton from "react-loading-skeleton"

import styles from "./post-card.module.scss"
import stylesSkeleton from "./post-card-skeleton.module.scss"

export const PostCardSkeleton = () => {
  const componentClassName = classNames(styles.component)

  const title = (
    <Skeleton
      width={120}
      height={20}
    />
  )

  return (
    <Card
      className={componentClassName}
      title={title}
      styles={CARD_STYLES}
    >
      <div className={stylesSkeleton.tags}>
        <Skeleton
          width={60}
          height={20}
        />
        <Skeleton
          width={60}
          height={20}
        />
        <Skeleton
          width={60}
          height={20}
        />
      </div>
      <div>
        <Skeleton
          width='100%'
          count={3}
          height={16}
        />
      </div>
      <div
        className={stylesSkeleton.author}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Skeleton
          width={90}
          height={16}
        />
      </div>
      <div className={stylesSkeleton.date}>
        <Skeleton
          width={140}
          height={16}
        />
      </div>
    </Card>
  )
}
