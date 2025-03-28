import { FC } from "react"
import styles from "./banner.module.scss"
import { TBanner } from "../model"
import { FEED_DEFAULT_BANNER } from "../config"
import { Container } from "@/06_shared/ui/container"
import Title from "antd/es/typography/Title"
import classNames from "classnames"

type TProps = TBanner & {
  componentClass?: string
  titleClass?: string
  contentClass?: string
}

export const Banner: FC<TProps> = ({
  title = FEED_DEFAULT_BANNER.title,
  content = FEED_DEFAULT_BANNER.content,
  componentClass,
  contentClass,
  titleClass,
}) => {
  const componentClassName = classNames(styles.component, componentClass)
  const titleClassName = classNames(styles.title, titleClass)
  const contentClassName = classNames(styles.content, contentClass)

  return (
    <Container
      className={componentClassName}
      size='full'
    >
      <Title
        className={titleClassName}
        level={1}
      >
        {title}
      </Title>
      <p className={contentClassName}>{content}</p>
    </Container>
  )
}
