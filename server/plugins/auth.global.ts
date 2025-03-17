import jwt from "jsonwebtoken"
import prisma from "~/lib/prisma"

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", async (event) => {
    if (publicServerRoutes.includes(event.path)) {
      return
    }

    if (event.path.startsWith("/api")) {
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

        const { password, ...rest } = user
        event.context.user = rest
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          throw createError({ statusCode: 401, message: "Token expired" })
        }
      }
    }
  })
})
