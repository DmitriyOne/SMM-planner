import { Post } from '@prisma/client'

export const postsMock: Partial<Post>[] = [
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
