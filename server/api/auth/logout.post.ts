import { defineEventHandler, getCookie, deleteCookie } from "h3"
import jwt from "jsonwebtoken"
import { redis } from "~/server/redis"

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refreshToken")
  if (!refreshToken) {
    throw createError({ statusCode: 401, message: "No refresh token" })
  }

  const decoded = jwt.decode(refreshToken) as { login: string }
  await redis.del(`refreshToken:${decoded.login}`)

  deleteCookie(event, "refreshToken")
  return { message: "Logged out successfully" }
})
