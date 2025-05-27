import { FC } from "react"
import Skeleton from "react-loading-skeleton"
import Text from "antd/es/typography/Text"

import { ERole } from "@/06_shared/model/enum"
import { Tag } from "antd"
import Paragraph from "antd/es/typography/Paragraph"

import styles from "./role.module.scss"

type TProps = {
  isLoading: boolean
  role: ERole | undefined | null
}

export const Role: FC<TProps> = ({ role, isLoading }) => {
  return (
    <>
      <div className={styles.component}>
        <Text>Role:</Text>
        {isLoading ? (
          <Skeleton
            width={80}
            height={20}
            containerClassName={styles.skeletonContainer}
            className={styles.skeleton}
          />
        ) : (
          <Tag
            className={styles.tag}
            color='blue'
          >
            {role}
          </Tag>
        )}
      </div>
      {!isLoading && role !== "admin" && role !== "super_admin" && (
        <Paragraph
          className={styles.info}
          type='secondary'
        >
          If you want to change your role, please contact the administrator
        </Paragraph>
      )}
    </>
  )
}
