import jwt from "jsonwebtoken"
import prisma from "~/lib/prisma"
import {
  publicClientRoutes,
  publicServerRoutes,
} from "~/server/utils/constants"
import type { H3Error } from "h3"

export default defineEventHandler(async (event) => {
  // Пропускаем публичные маршруты
  const publicRoutes = [...publicServerRoutes, ...publicClientRoutes]
  if (publicRoutes.includes(event.path)) {
    return
  }

  // Проверка access token
  const authHeader = getHeader(event, "Authorization")
  const token = authHeader?.split(" ")[1]

  if (!token) {
    throw createError({ statusCode: 401, message: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      login: string
    }
    const user = await prisma.user.findFirst({
      where: { login: decoded.login },
    })

    if (!user) {
      throw createError({ statusCode: 401, message: "Invalid token" })
    }

    event.context.user = user
  } catch (error) {
    throw createError({
      statusCode: (error as H3Error).statusCode,
      message: (error as H3Error).message,
    })
  }
})
