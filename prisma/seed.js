import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"
import { useFakeData } from "./fakeData.js"

const prisma = new PrismaClient()

async function seed() {
  const [
    userCount,
    companyCount,
    agentCount,
    adCount,
    companyReviewCount,
    agentReviewCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.company.count(),
    prisma.agent.count(),
    prisma.ad.count(),
    prisma.companyReview.count(),
    prisma.agentReview.count(),
  ])

  const isDatabaseEmpty =
    userCount === 0 &&
    companyCount === 0 &&
    agentCount === 0 &&
    adCount === 0 &&
    companyReviewCount === 0 &&
    agentReviewCount === 0

  const { user, agentReviews, companyReviews, ads, agents, company } =
    useFakeData()

  if (isDatabaseEmpty) {
    try {
      // Создаем пользователя
      const hashedPassword = await argon2.hash("secret")
      await prisma.user.create({
        data: user(hashedPassword),
      })

      // Создаем компанию с отзывами
      const companyCreated = await prisma.company.create({
        data: {
          ...company(),
          reviews: {
            create: companyReviews().map((review) => ({
              rating: review.rating,
              comment: review.comment,
            })),
          },
        },
        include: { reviews: true },
      })

      // Создаем агентов
      const createdAgents = await prisma.agent.createMany({
        data: agents(companyCreated.id).map((agent) => ({
          firstName: agent.firstName,
          lastName: agent.lastName,
          avatar: agent.avatar,
          description: agent.description,
          premium: agent.premium,
          companyId: companyCreated.id, // Убедитесь, что companyId установлен для всех
        })),
      })

      // Создаем отзывы для агентов
      const allAgents = await prisma.agent.findMany()
      const reviewsData = agentReviews().flatMap((review, index) => {
        return allAgents.map((agent) => ({
          rating: review.rating,
          comment: review.comment,
          agentId: agent.id,
        }))
      })

      await prisma.agentReview.createMany({
        data: reviewsData,
      })

      // Создаем объявления
      await prisma.ad.createMany({
        data: ads(companyCreated.id),
      })

      console.log("Database seeded successfully")
    } catch (e) {
      console.error("Seed failed:", e)
    }
  } else {
    console.log("Database already contains data - skipping seed")
  }
}

try {
  await seed()
  await prisma.$disconnect()
} catch (e) {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
}
