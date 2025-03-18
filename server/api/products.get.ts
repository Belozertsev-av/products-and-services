import type { IAdInfo, PaginationResult } from "~/utils/types"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const { id, pageSize, zeroBasedNumber } = getQuery(event) as {
    id: string
    pageSize: string
    zeroBasedNumber: string
  }

  // Валидация параметров
  if (
    !id ||
    !pageSize ||
    !zeroBasedNumber ||
    isNaN(Number(id)) ||
    isNaN(Number(pageSize)) ||
    isNaN(Number(zeroBasedNumber))
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid parameters",
    })
  }

  const companyId = Number(id)
  const page = Number(zeroBasedNumber)
  const size = Number(pageSize)
  const skip = page * size

  try {
    // Проверка существования компании
    const companyExists = await prisma.company.findUnique({
      where: { id: companyId },
    })

    if (!companyExists) {
      throw createError({
        statusCode: 404,
        statusMessage: "Company not found",
      })
    }

    // Выполняем оба запроса параллельно
    const [totalAds, ads] = await prisma.$transaction([
      prisma.ad.count({ where: { companyId } }),
      prisma.ad.findMany({
        where: { companyId },
        skip,
        take: size,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          img: true,
          price: true,
          currency: true,
          label: true,
          type: true,
          status: true,
          createdAt: true,
          watched: true,
        },
      }),
    ])

    // Конвертация даты в timestamp
    const formattedAds = ads.map((ad) => ({
      ...ad,
      createdAt: ad.createdAt.getTime(),
    })) as IAdInfo[]

    return {
      page: {
        size: size,
        zeroBasedNumber: page,
      },
      resources: formattedAds,
      resourcesTotalNumber: totalAds,
    } as PaginationResult<IAdInfo[]>
  } catch (error) {
    console.error("Error fetching ads:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    })
  }
})
