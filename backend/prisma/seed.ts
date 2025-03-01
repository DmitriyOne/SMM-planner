import { PrismaClient, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { postsMock, usersMock, saltMock, tagsMock } from 'mocks'

const prisma = new PrismaClient()

async function main() {
  const [passwordUser1, passwordUser2] = await Promise.all([
    bcrypt.hash('123456', saltMock),
    bcrypt.hash('654321', saltMock),
  ])

  const usersData: Partial<User>[] = [
    {
      ...usersMock[0],
      password: passwordUser1,
    },
    {
      ...usersMock[1],
      password: passwordUser2,
    },
  ]

  const user1 = await prisma.user.upsert({
    where: { email: usersData[0].email },
    update: {
      password: usersData[0].password,
    },
    create: {
      email: usersData[0].email,
      name: usersData[0].name,
      password: usersData[0].password,
      role: usersData[0].role,
    },
  })
  const user2 = await prisma.user.upsert({
    where: { email: usersData[1].email },
    update: {
      password: usersData[1].password,
    },
    create: {
      email: usersData[1].email,
      name: usersData[1].name,
      password: usersData[1].password,
      role: usersData[1].role,
    },
  })

  const post1 = await prisma.post.upsert({
    where: { title: postsMock[0].title },
    update: {
      authorId: user1.id,
    },
    create: {
      title: postsMock[0].title,
      description: postsMock[0].description,
      image: postsMock[0].image,
      isApproved: postsMock[0].isApproved,
      isPublish: postsMock[0].isPublish,
      authorId: user1.id,
    },
  })
  const post2 = await prisma.post.upsert({
    where: { title: postsMock[1].title },
    update: {
      authorId: user2.id,
    },
    create: {
      title: postsMock[1].title,
      description: postsMock[1].description,
      image: postsMock[1].image,
      isApproved: postsMock[1].isApproved,
      isPublish: postsMock[1].isPublish,
      authorId: user2.id,
    },
  })
  const post3 = await prisma.post.upsert({
    where: { title: postsMock[2].title },
    update: {
      authorId: user2.id,
    },
    create: {
      title: postsMock[2].title,
      description: postsMock[2].description,
      image: postsMock[2].image,
      isApproved: postsMock[2].isApproved,
      isPublish: postsMock[2].isPublish,
      authorId: user2.id,
    },
  })

  const tag1 = await prisma.tag.upsert({
    where: { title: tagsMock[0].title },
    update: {
      authorId: user1.id,
      posts: {
        connect: { id: post1.id },
      },
    },
    create: {
      title: tagsMock[0].title,
      authorId: user1.id,
      posts: {
        connect: { id: post1.id },
      },
    },
  })
  const tag2 = await prisma.tag.upsert({
    where: { title: tagsMock[1].title },
    update: {
      authorId: user2.id,
      posts: {
        connect: { id: post2.id },
      },
    },
    create: {
      title: tagsMock[1].title,
      authorId: user2.id,
      posts: {
        connect: { id: post2.id },
      },
    },
  })
  const tag3 = await prisma.tag.upsert({
    where: { title: tagsMock[2].title },
    update: {
      authorId: user2.id,
      posts: {
        connect: { id: post3.id },
      },
    },
    create: {
      title: tagsMock[2].title,
      authorId: user2.id,
      posts: {
        connect: [{ id: post3.id }, { id: post2.id }],
      },
    },
  })

  console.log({ user1, user2 })
  console.log({ post1, post2, post3 })
  console.log({ tag1, tag2, tag3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
