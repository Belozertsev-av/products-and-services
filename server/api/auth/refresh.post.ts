import { defineEventHandler, getCookie } from "h3"
import jwt from "jsonwebtoken"
import { redis } from "~/server/redis"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refreshToken")
  if (!refreshToken) {
    throw createError({ statusCode: 401, message: "No refresh token" })
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
    login: string
  }
  const storedToken = await redis.get(`refreshToken:${decoded.login}`)

  if (refreshToken !== storedToken) {
    throw createError({ statusCode: 401, message: "Invalid refresh token" })
  }

  // Генерация нового access token
  const user = await prisma.user.findFirst({ where: { login: decoded.login } })
  if (!user) {
    throw createError({ statusCode: 404, message: "No user found" })
  }
  const newAccessToken = jwt.sign(
    { login: user.login, firstName: user.firstName, lastName: user.lastName },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" },
  )

  return { accessToken: newAccessToken }
})
