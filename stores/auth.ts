import { defineStore } from "pinia"
import type { IUserCredentials } from "~/utils/types"
import type { User } from "@prisma/client"

export const useAuthStore = defineStore(
  "auth",
  () => {
    const _accessToken = ref<string | null>(null)
    const user = ref<Omit<User, "password"> | null>(null)

    const login = async (credentials: IUserCredentials) => {
      try {
        const { accessToken } = await $fetch<{ accessToken: string }>(
          "/api/auth/login",
          {
            method: "POST",
            body: credentials,
          },
        )
        _accessToken.value = accessToken
        user.value = await getUserData()
      } catch (error: any) {
        throw new Error(error.data?.message || "Authorization failed")
      }
    }

    const logout = async () => {
      await $fetch("/api/auth/logout", { method: "POST" })
      _accessToken.value = null
      user.value = null
    }

    const getUserData = async (): Promise<Omit<User, "password"> | null> => {
      try {
        return await $fetch<Omit<User, "password">>("/api/auth/profile", {
          headers: {
            authorization: `Bearer ${_accessToken.value}`,
          },
        })
      } catch (error: any) {
        return null
      }
    }

    const refreshToken = async (): Promise<string | null> => {
      try {
        const { accessToken } = await $fetch("/api/auth/refresh", {
          method: "POST",
        })
        return accessToken
      } catch (error) {
        return null
      }
    }

    const checkAuth = async (): Promise<boolean> => {
      // Первая попытка получить данные
      const maybeUserFound = await getUserData()
      if (maybeUserFound) {
        user.value = maybeUserFound
        return true
      }

      // Если не удалось, пробуем обновить токен
      const maybeRefreshedToken = await refreshToken()
      if (maybeRefreshedToken) {
        _accessToken.value = maybeRefreshedToken

        // Повторная попытка после обновления
        const maybeUserFound = await getUserData()

        if (maybeUserFound) {
          user.value = maybeUserFound
          return true
        }
      }
      _accessToken.value = null
      user.value = null

      // Если всё провалилось
      return false
    }

    return { user, checkAuth, login, refreshToken, logout }
  },
  { persist: true },
)
