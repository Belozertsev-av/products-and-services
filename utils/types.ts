import type { User } from "@prisma/client"

export interface IGroupedSelectOption {
  label: Category
  options: ISelectOption[]
}

export interface ISelectOption {
  label: string
  count: number
  value: string
}

export const categories = ["Категория 1", "Категория 2"] as const
export type Category = (typeof categories)[number]

export interface IAdInfo {
  id: number
  img: string
  price: number
  currency: Currency
  label: string
  type: AdType
  status: AdStatus
  createdAt: number
  watched: number
}

export type AdType = "product" | "service"

export type AdStatus = "PROMOTING" | "CREATED" | "CLOSED"

export const currencies = ["RUB", "USD", "EUR"] as const
export type Currency = (typeof currencies)[number]

export enum CurrencySymbols {
  RUB = "₽",
  USD = "$",
  EUR = "€",
}

export interface IAgentInfo extends IStatistics {
  id: number
  firstName: string
  lastName: string
  avatar: string
  description: string
}

export interface ICompanyInfo extends IStatistics {
  id: number
  name: string
  phoneNumber: string
  agentsCount: number
  img: string
}

export interface ICompanyAdditionalInfo {
  description: string
  address: string
  schedule: Record<Day, [string, string]>
  coordinates: [number, number]
}

export interface IStatistics {
  rate: number | null
  reviewCount: number | null
  premium: boolean
}

export const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const
export type Day = (typeof days)[number]

export enum Days {
  mon = "Понедельник",
  tue = "Вторник",
  wed = "Среда",
  thu = "Четверг",
  fri = "Пятница",
  sat = "Суббота",
  sun = "Восскресенье",
}

export interface IUserCredentials {
  login: string
  password: string
}

export type IUser = Omit<User, "password">
