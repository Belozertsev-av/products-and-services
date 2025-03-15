import type { Currency } from "./types"

export const formatPrice = (price: number): string => {
  const str = price.toString()
  let result = ""

  for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
    if (count % 3 === 0 && count !== 0) {
      result = " " + result
    }
    result = str[i] + result
  }

  return result
}

export const getCurrencySymbol = (currency: Currency) =>
  CurrencySymbols[currency]

export const getDateDifferenceInDaysFromTimestamp = (
  timestamp: number,
): number => {
  const givenDate = new Date(timestamp * 1000)

  const currentDate = new Date()

  const differenceInMs = currentDate.getTime() - givenDate.getTime()

  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24))

  if (differenceInDays < 1) {
    return 0
  } else {
    return differenceInDays
  }
}
