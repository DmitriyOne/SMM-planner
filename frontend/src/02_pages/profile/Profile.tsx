"use client"

import { useUserContext } from "@/05_entities/user/model/context"

import { Divider, Space } from "antd"

import { formatIsoToDatetime } from "@/06_shared/model/utils"

import { Greeting } from "@/05_entities/user/ui/greeting"
import { Role } from "@/05_entities/user/ui/role"
import { UserMetaItem } from "@/05_entities/user/ui/meta-item"

import { CopyTextButton } from "@/04_features/сopy-text-button/ui"
import classNames from "classnames"
import { DeleteUser } from "@/04_features/delete-user/ui"

import styles from "./profile.module.scss"

export const ProfilePage = () => {
  const { user, isLoading } = useUserContext()

  const idClassName = classNames(styles.id, { [styles.loading]: isLoading })

  return (
    <div className={styles.component}>
      <Greeting />
      <Divider />
      <Space
        direction='vertical'
        size='middle'
        className={styles.container}
      >
        <UserMetaItem
          title='Name'
          data={user?.name}
          isLoading={isLoading}
          skeletonWidth={120}
        />
        <UserMetaItem
          title='Email'
          data={user?.email}
          isLoading={isLoading}
          skeletonWidth={200}
        />
        <Role
          role={user?.role}
          isLoading={isLoading}
        />
        <UserMetaItem
          title='Posts'
          data={user?.posts?.length}
          isLoading={isLoading}
        />
        <UserMetaItem
          title='Tags'
          data={user?.tags?.length}
          isLoading={isLoading}
        />
        <UserMetaItem
          title='Account created'
          data={formatIsoToDatetime(user?.createdAt as string)}
          isLoading={isLoading}
          skeletonWidth={180}
        />
        <UserMetaItem
          title='Account updated'
          data={formatIsoToDatetime(user?.updatedAt as string)}
          isLoading={isLoading}
          skeletonWidth={180}
        />
      </Space>

      <div className={styles.idContainer}>
        <UserMetaItem
          className={idClassName}
          title='ID'
          data={user?.id}
          skeletonWidth={80}
          isLoading={isLoading}
        />
        <CopyTextButton text={user?.id} />
      </div>
      <DeleteUser isPositionAbsolute />
    </div>
  )
}
