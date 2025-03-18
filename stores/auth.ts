import { defineStore } from "pinia"
import type { IUser, IUserCredentials } from "~/utils/types"

export const useAuthStore = defineStore(
  "auth",
  () => {
    const accessToken = ref<string | null>(null)
    const user = ref<IUser | null>(null)

    const login = async (credentials: IUserCredentials) => {
      try {
        const { accessToken: _accessToken } = await useAPI().post<{
          accessToken: string
        }>("auth/login", {
          body: credentials,
        })
        accessToken.value = _accessToken
        user.value = await getUserData()
      } catch (error: any) {
        throw new Error(error.data?.message || "Authorization failed")
      }
    }

    const logout = async () => {
      await useAPI().post("auth/logout")
      accessToken.value = null
      user.value = null

      await navigateTo("/")
    }

    const getUserData = async (): Promise<IUser | null> => {
      try {
        return await useAPI().get<IUser>("auth/profile")
      } catch (error: any) {
        return null
      }
    }

    const refreshToken = async (): Promise<string | null> => {
      try {
        const { accessToken } = await useAPI().post<{ accessToken: string }>(
          "auth/refresh",
        )
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
        accessToken.value = maybeRefreshedToken

        // Повторная попытка после обновления
        const maybeUserFound = await getUserData()

        if (maybeUserFound) {
          user.value = maybeUserFound
          return true
        }
      }

      // Если всё провалилось
      accessToken.value = null
      user.value = null
      return false
    }

    return { user, accessToken, checkAuth, login, refreshToken, logout }
  },
  { persist: true },
)
