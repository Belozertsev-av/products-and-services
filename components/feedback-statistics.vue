<template>
  <ul class="statistics__info">
    <li
      v-if="premium"
      class="statistics__detail"
    >
      <custom-icon
        icon="premium"
        size="1.1rem"
        style="color: var(--q-primary)"
      />
      <span v-if="device.isMobileOrTablet">Проверен</span>
      <span v-else>Документы проверены</span>
    </li>

    <li
      v-if="rate"
      class="statistics__detail"
    >
      <custom-icon
        icon="star"
        size="1.1rem"
        style="color: var(--q-primary)"
      />
      <span>{{ rate }}</span>
    </li>
    <li
      v-if="reviewCount"
      class="statistics__detail"
    >
      <span>{{ reviewCount }} отзывов</span>
    </li>
    <li
      v-if="!rate && !reviewCount"
      class="statistics__detail"
    >
      <span>Нет отзывов</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  premium: boolean
  rate: number | null
  reviewCount: number | null
}>()

const device = useDevice()
</script>

<style lang="scss" scoped>
.statistics {
  &__info {
    display: flex;
    justify-content: center;
  }

  &__detail {
    display: flex;
    gap: 0.3rem;
    align-items: center;

    &:not(:first-child)::before {
      margin: 0 0.5rem;
      content: "•";
    }
  }
}
</style>
