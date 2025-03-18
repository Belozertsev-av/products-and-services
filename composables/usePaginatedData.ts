import type { IPage, PaginationResult } from "~/utils/types"
import { useAPI } from "~/composables/useAPI"
import type { NitroFetchOptions, NitroFetchRequest } from "nitropack/types"
import { DEFAULT_PAGE_SIZE } from "~/utils/contants"
import type { UnwrapRef } from "vue"

interface PaginatedDataState<T> {
  page: IPage
  list: T[]
  totalCount: number
  isLoading: boolean
}

export const usePaginatedData = <T>() => {
  const state = reactive<PaginatedDataState<T>>({
    page: {
      zeroBasedNumber: 0,
      size: DEFAULT_PAGE_SIZE,
    },
    list: [],
    totalCount: 0,
    isLoading: false,
  })

  const getData = async (
    url: string,
    options: NitroFetchOptions<NitroFetchRequest, "get">,
  ) => {
    state.isLoading = true

    const result = await useAPI().get<PaginationResult<T[]>>(url, {
      ...options,
      params: {
        zeroBasedNumber: state.page.zeroBasedNumber,
        pageSize: state.page.size,
        ...options.params,
      },
    })

    if (result) {
      state.list.push(...(result.resources as UnwrapRef<T[]>))
      state.totalCount = result.resourcesTotalNumber
    }

    state.isLoading = false
  }

  const resetData = () => {
    Object.assign(state, {
      page: {
        zeroBasedNumber: 0,
        size: DEFAULT_PAGE_SIZE,
      },
      list: [],
      totalCount: 0,
      isLoading: false,
    })
  }

  const setPage = (size?: number, startNumber?: number) => {
    state.page = {
      zeroBasedNumber: startNumber ?? state.page.zeroBasedNumber,
      size: size ?? state.page.size,
    }
  }

  return {
    list: computed(() => state.list),
    totalCount: computed(() => state.totalCount),
    isLoading: computed(() => state.isLoading),
    getData,
    resetData,
    setPage,
  }
}
