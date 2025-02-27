import { Post, PrismaClient, Tag, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const roundsOfHashing = 10

async function main() {
  const [passwordUser1, passwordUser2] = await Promise.all([
    bcrypt.hash('123456', roundsOfHashing),
    bcrypt.hash('654321', roundsOfHashing),
  ])

  const usersData: Partial<User>[] = [
    {
      email: 'user1@gmail.com',
      password: passwordUser1,
      name: 'User 1',
      role: 'admin',
    },
    {
      email: 'user2@gmail.com',
      password: passwordUser2,
      name: 'User 2',
      role: 'reader',
    },
  ]

  const postsData: Partial<Post>[] = [
    {
      title: 'Getting Started with Prisma: Why It’s Worth Learning',
      description:
        'I’m diving into Prisma for the first time, and it’s already proving to be a powerful tool for database management. Here are my first impressions!',
      image: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739983588/smm-planner/prisma.jpg',
      isApproved: false,
      isPublish: false,
    },
    {
      title: 'What’s Next? Expanding Your Development Skills',
      description:
        'After mastering backend development, mobile development could be your next challenge. React Native or Flutter might open exciting new opportunities!',
      image: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739983588/smm-planner/react-native-vs-flutter.jpg',
      isApproved: true,
      isPublish: false,
    },
    {
      title: 'The Key to Success in IT: Never Stop Learning',
      description:
        'Technology evolves fast, and staying ahead means constantly improving your skills. The more you learn, the more opportunities you unlock!',
      image: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739983588/smm-planner/never-stop-learning.jpg',
      isApproved: true,
      isPublish: true,
    },
  ]

  const tagsData: Partial<Tag>[] = [{ title: 'Frontend' }, { title: 'Backend' }, { title: 'Mobile' }]

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
    where: { title: postsData[0].title },
    update: {
      authorId: user1.id,
    },
    create: {
      title: postsData[0].title,
      description: postsData[0].description,
      image: postsData[0].image,
      isApproved: postsData[0].isApproved,
      isPublish: postsData[0].isPublish,
      authorId: user1.id,
    },
  })
  const post2 = await prisma.post.upsert({
    where: { title: postsData[1].title },
    update: {
      authorId: user2.id,
    },
    create: {
      title: postsData[1].title,
      description: postsData[1].description,
      image: postsData[1].image,
      isApproved: postsData[1].isApproved,
      isPublish: postsData[1].isPublish,
      authorId: user2.id,
    },
  })
  const post3 = await prisma.post.upsert({
    where: { title: postsData[2].title },
    update: {
      authorId: user2.id,
    },
    create: {
      title: postsData[2].title,
      description: postsData[2].description,
      image: postsData[2].image,
      isApproved: postsData[2].isApproved,
      isPublish: postsData[2].isPublish,
      authorId: user2.id,
    },
  })

  const tag1 = await prisma.tag.upsert({
    where: { title: tagsData[0].title },
    update: {
      authorId: user1.id,
      posts: {
        connect: { id: post1.id },
      },
    },
    create: {
      title: tagsData[0].title,
      authorId: user1.id,
      posts: {
        connect: { id: post1.id },
      },
    },
  })
  const tag2 = await prisma.tag.upsert({
    where: { title: tagsData[1].title },
    update: {
      authorId: user2.id,
      posts: {
        connect: { id: post2.id },
      },
    },
    create: {
      title: tagsData[1].title,
      authorId: user2.id,
      posts: {
        connect: { id: post2.id },
      },
    },
  })
  const tag3 = await prisma.tag.upsert({
    where: { title: tagsData[2].title },
    update: {
      authorId: user2.id,
      posts: {
        connect: { id: post3.id },
      },
    },
    create: {
      title: tagsData[2].title,
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
