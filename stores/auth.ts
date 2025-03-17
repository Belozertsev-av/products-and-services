import { defineStore } from "pinia"
import type { IUser, IUserCredentials } from "~/utils/types"

export const useAuthStore = defineStore(
  "auth",
  () => {
    const _accessToken = ref<string | null>(null)
    const user = ref<IUser | null>(null)

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

    const getUserData = async (): Promise<IUser | null> => {
      try {
        return await $fetch<IUser>("/api/auth/profile", {
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

      // Если всё провалилось
      _accessToken.value = null
      user.value = null
      return false
    }

    return { user, checkAuth, login, refreshToken, logout }
  },
  { persist: true },
)
