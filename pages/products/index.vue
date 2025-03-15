<template>
  <div class="products">
    <div class="products__categories">
      <multi-category-select
        v-model="selected"
        :label="selected ? 'Категория' : 'Все товары и услуги'"
        :grouped-options="groupedOptions"
      />
    </div>
    <div class="products__body">
      <ad-card
        v-for="ad in ads"
        :key="ad.id"
        :ad-info="ad"
        class="products__card"
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

const ads = ref<IAdInfo[]>([
  {
    id: 1,
    img: "Img-1.webp",
    price: 450500,
    currency: "RUB",
    label: "Сlavia Nord Grand сценическое цифровое пианино",
    type: "product",
    status: "PROMOTING",
    watched: 750,
    createdAt: 1741844517,
  },
  {
    id: 2,
    img: "Img-2.webp",
    price: 3285000,
    currency: "RUB",
    label: "Hyundai Sonata 2.0 AT, 2023, 30 км",
    type: "product",
    status: "CREATED",
    watched: 255,
    createdAt: 1741671717,
  },
  {
    id: 3,
    img: "Img-3.webp",
    price: 4800000,
    currency: "RUB",
    label: "2-к. квартира, 46 м², 1/5 эт.",
    type: "product",
    status: "CREATED",
    watched: 255,
    createdAt: 1741936396,
  },
  {
    id: 4,
    img: "Img-4.webp",
    price: 7500,
    currency: "RUB",
    label: "Старые барабаны",
    type: "product",
    status: "CREATED",
    watched: 255,
    createdAt: 1741844517,
  },
  {
    id: 5,
    img: "Img-5.webp",
    price: 7500,
    currency: "RUB",
    label: "DMX сплиттер RJ45 to 4x XLR Stairville",
    type: "product",
    status: "CREATED",
    watched: 320,
    createdAt: 1741671717,
  },
  {
    id: 6,
    img: "Img-6.webp",
    price: 217500,
    currency: "RUB",
    label: "Мотоцикл Honda",
    type: "product",
    status: "CREATED",
    watched: 255,
    createdAt: 1742033600,
  },
  {
    id: 7,
    img: "Img-7.webp",
    price: 17900,
    currency: "RUB",
    label: "Иж юпитер 5",
    type: "product",
    status: "CREATED",
    watched: 255,
    createdAt: 1740899596,
  },
  {
    id: 8,
    img: "Img-8.webp",
    price: 7500,
    currency: "RUB",
    label: "Пылесос кёрхер с водяным мешком для сбора пыли",
    type: "product",
    status: "CLOSED",
    watched: 255,
    createdAt: 1741844517,
  },
])
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
