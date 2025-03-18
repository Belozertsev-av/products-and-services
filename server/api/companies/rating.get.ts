import prisma from "~/lib/prisma"
import type { IStatistics } from "~/utils/types"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event) as { id?: string }

    // Валидация параметров
    if (!id || isNaN(Number(id))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid company ID",
      })
    }

    const companyId = Number(id)

    // Поиск компании
    const companyInfo = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        premium: true,
        _count: { select: { reviews: true } },
      },
    })

    if (!companyInfo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Company not found",
      })
    }

    // Запрос среднего рейтинга
    const avgRating = await prisma.companyReview.aggregate({
      where: { companyId },
      _avg: { rating: true },
    })

    // Формирование ответа
    const result: IStatistics = {
      rate: avgRating._avg.rating ?? null,
      reviewCount: companyInfo._count.reviews,
      premium: companyInfo.premium,
    }

    return result
  } catch (error) {
    console.error("Error in statistics endpoint:", error)

    // Обработка известных ошибок
    if (error instanceof PrismaClientKnownRequestError) {
      throw createError({
        statusCode: 500,
        statusMessage: "Database error occurred",
      })
    }

    // Проброс уже созданных ошибок
    if (error instanceof Error && "statusCode" in error) {
      throw error
    }

    // Общая ошибка по умолчанию
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    })
  }
})
