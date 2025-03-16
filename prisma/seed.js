import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"

const prisma = new PrismaClient()

async function seed() {
  const existingRecords = await prisma.user.count()

  if (existingRecords === 0) {
    const hashedPassword = await argon2.hash("secret")
    await prisma.user.create({
      data: {
        login: "admin",
        password: hashedPassword,
        firstName: "Райан",
        lastName: "Гослинг",
      },
    })

    console.log("Database seeded successfully")
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
