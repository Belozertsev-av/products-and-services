import prisma from "~/lib/prisma"
import type { ICompanyInfo } from "~/utils/types"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary"

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id")

    // Валидация параметров
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid company ID format",
      })
    }

    const companyId = Number(id)

    // Поиск компании
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        img: true,
        _count: { select: { agents: true } },
      },
    })

    if (!company) {
      throw createError({
        statusCode: 404,
        statusMessage: "Company not found",
      })
    }

    // Формирование ответа
    const result: ICompanyInfo = {
      ...company,
      agentsCount: company._count.agents,
    }

    return result
  } catch (error) {
    console.error("Error in company info endpoint:", error)

    // Обработка ошибок Prisma
    if (error instanceof PrismaClientKnownRequestError) {
      throw createError({
        statusCode: 500,
        statusMessage: "Database query error",
      })
    }

    // Проброс существующих HTTP ошибок
    if (error instanceof Error && "statusCode" in error) {
      throw error
    }

    // Общая ошибка сервера
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    })
  }
})
