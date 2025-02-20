import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@gmail.com' },
    update: {},
    create: {
      email: 'user1@gmail.com',
      name: 'User 1',
      password: '123456',
      role: 'admin',
    },
  })
  const user2 = await prisma.user.upsert({
    where: { email: 'user2@gmail.com' },
    update: {},
    create: {
      email: 'user2@gmail.com',
      name: 'User 2',
      password: '654321',
      role: 'editor',
    },
  })

  const post1 = await prisma.post.upsert({
    where: { title: 'Getting Started with Prisma: Why It’s Worth Learning' },
    update: {
      authorId: user2.id,
    },
    create: {
      title: 'Getting Started with Prisma: Why It’s Worth Learning',
      description:
        'I’m diving into Prisma for the first time, and it’s already proving to be a powerful tool for database management. Here are my first impressions!',
      image: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739983588/smm-planner/prisma.jpg',
      isApproved: false,
      isPublish: false,
      authorId: user2.id,
    },
  })

  const post2 = await prisma.post.upsert({
    where: { title: 'What’s Next? Expanding Your Development Skills' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'What’s Next? Expanding Your Development Skills',
      description:
        'After mastering backend development, mobile development could be your next challenge. React Native or Flutter might open exciting new opportunities!',
      image: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739983588/smm-planner/react-native-vs-flutter.jpg',
      isApproved: true,
      isPublish: false,
      authorId: user1.id,
    },
  })

  const post3 = await prisma.post.upsert({
    where: { title: 'The Key to Success in IT: Never Stop Learning' },
    update: {
      authorId: user2.id,
    },
    create: {
      title: 'The Key to Success in IT: Never Stop Learning',
      description:
        'Technology evolves fast, and staying ahead means constantly improving your skills. The more you learn, the more opportunities you unlock!',
      image: 'https://res.cloudinary.com/due1q2azx/image/upload/v1739983588/smm-planner/never-stop-learning.jpg',
      isApproved: true,
      isPublish: true,
      authorId: user2.id,
    },
  })

  console.log({ user1, user2 })
  console.log({ post1, post2, post3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
