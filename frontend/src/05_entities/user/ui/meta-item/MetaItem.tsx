import Text from "antd/es/typography/Text"
import Skeleton from "react-loading-skeleton"
import classNames from "classnames"

import styles from "./meta-item.module.scss"

type Props = {
  title: string
  data?: string | number
  isLoading?: boolean
  skeletonWidth?: number
  skeletonHeight?: number
  className?: string
}

export const UserMetaItem = ({
  title,
  data,
  isLoading,
  skeletonWidth = 30,
  skeletonHeight = 20,
  className,
}: Props) => {
  const componentClassName = classNames(styles.component, className)
  return (
    <Text className={componentClassName}>
      {title}:{" "}
      {isLoading ? (
        <Skeleton
          containerClassName={styles.skeletonContainer}
          className={styles.skeleton}
          width={skeletonWidth}
          height={skeletonHeight}
        />
      ) : (
        data
      )}
    </Text>
  )
}
