import prisma from "~/lib/prisma"
import type { ICompanyInfo } from "~/utils/types"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  if (id) {
    const company = await prisma.company.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        img: true,
        premium: true,
        _count: {
          select: {
            agents: true, // Количество агентов
            reviews: true, // Количество отзывов
          },
        },
      },
    })

    if (!company) {
      return
    }

    // Отдельный запрос для среднего рейтинга
    const avgRating = await prisma.companyReview.aggregate({
      where: { companyId: Number(id) },
      _avg: {
        rating: true,
      },
    })

    if (!avgRating) {
      return
    }

    // Формируем результат
    const result: ICompanyInfo = {
      ...company,
      rate: avgRating._avg.rating ?? null,
      reviewCount: company._count.reviews,
      agentsCount: company._count.agents,
    }

    return result
  }
})
