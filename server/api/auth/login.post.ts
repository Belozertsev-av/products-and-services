import { defineEventHandler, readBody, setCookie } from "h3"
import jwt from "jsonwebtoken"
import argon2 from "argon2"
import { redis } from "~/server/redis"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event)
  const { login, password } = body

  // Поиск пользователя
  const user = await prisma.user.findFirst({ where: { login } })
  if (!user) {
    throw createError({ statusCode: 401, message: "Invalid credentials" })
  }

  // Проверка пароля
  const validPassword = await argon2.verify(user.password, password)
  if (!validPassword) {
    throw createError({ statusCode: 401, message: "Invalid credentials" })
  }

  // Генерация токенов
  const accessToken = jwt.sign(
    { login: user.login, firstName: user.firstName, lastName: user.lastName },
    config.jwtSecret,
    { expiresIn: "15m" },
  )

  const refreshToken = jwt.sign({ login: user.login }, config.jwtSecret, {
    expiresIn: "7d",
  })

  // Сохранение refresh token в Redis
  await redis.set(
    `refreshToken:${user.login}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60,
  )

  // Установка куки
  setCookie(event, "refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  })

  return { accessToken }
})
