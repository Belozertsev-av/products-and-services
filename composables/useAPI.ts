import type { NitroFetchOptions, NitroFetchRequest } from "nitropack/types"

type HttpMethod = "get" | "post" | "put" | "patch" | "delete"

export const useAPI = () => {
  const authStore = useAuthStore()

  const createApiMethod = <M extends HttpMethod>(method: M) => {
    return async <T>(
      url: string,
      options: NitroFetchOptions<NitroFetchRequest, M> = {},
    ): Promise<T> => {
      return $fetch<T>(url, {
        method,
        baseURL: `api/`,
        headers: {
          "Content-Type": "application/json",
          ...(authStore.accessToken
            ? { Authorization: `Bearer ${authStore.accessToken}` }
            : {}),
          ...options.headers,
        },
        ...options,
      })
    }
  }

  return {
    get: createApiMethod("get"),
    post: createApiMethod("post"),
    put: createApiMethod("put"),
    patch: createApiMethod("patch"),
    delete: createApiMethod("delete"),
  }
}
