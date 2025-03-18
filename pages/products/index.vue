<template>
  <div class="products">
    <div class="products__categories">
      <multi-category-select
        v-model="selected"
        :label="selected ? 'Категория' : 'Все товары и услуги'"
        :grouped-options="groupedOptions"
      />
    </div>
    <div
      v-if="!isLoading && ads"
      class="products__body"
    >
      <ad-card
        v-for="ad in ads"
        :key="ad.id"
        :ad-info="ad"
        class="products__card"
      />
    </div>
    <div
      v-else
      class="products__spinner-body"
    >
      <q-spinner
        color="primary"
        size="4rem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MultiCategorySelect from "~/components/ui/multi-category-select.vue"
import AdCard from "~/components/ad-card.vue"

import type {
  IAdInfo,
  IGroupedSelectOption,
  ISelectOption,
} from "~/utils/types"
import { usePaginatedData } from "~/composables/usePaginatedData"

const selected = ref<ISelectOption | null>(null)
const groupedOptions = ref<IGroupedSelectOption[]>([
  {
    label: "Категория 1",
    options: [
      { label: "Гробы", count: 5, value: "coffins" },
      { label: "Урны", count: 12, value: "urns" },
    ],
  },
  {
    label: "Категория 2",
    options: [
      { label: "Тапки", count: 2, value: "slippers" },
      { label: "Покрывало", count: 1, value: "bedspreads" },
    ],
  },
])

const { list: ads, isLoading, getData: getAds } = usePaginatedData<IAdInfo>()

onBeforeMount(async () => {
  const companyId = 1 // STUB

  await getAds("products", {
    params: {
      id: companyId,
    },
  })
})
</script>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__categories {
    min-width: calc(360px - 2rem);
    margin: 1.6rem auto;
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2rem;
    width: 100%;
    height: fit-content;
    margin-bottom: 4rem;
  }

  &__spinner-body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 2rem;
  }
}

@media screen and (width <= 1921px) {
  .products {
    &__body {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media screen and (width <= 1367px) {
  .products {
    &__body {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (width <= 1025px) {
  .products {
    &__body {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (width <= 610px) {
  .products {
    &__body {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
