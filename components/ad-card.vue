<template>
  <div class="card">
    <div class="card__image">
      <img
        :src="`/ad-imgs/${adInfo.img}`"
        :alt="adInfo.label"
      />
      <div class="card__layover">
        <div class="card__badge">
          <q-icon
            name="visibility"
            size="1.4rem"
          />
          <div class="card__count">{{ adInfo.watched }}</div>
        </div>
        <div class="card__badge">
          <q-icon
            name="calendar_today"
            size="1.4rem"
          />
          <div class="card__count">
            {{ daysFromCreation }}
          </div>
        </div>
      </div>
    </div>
    <div class="card__info">
      <div class="card__price subtitle">
        {{ formatPrice(adInfo.price) }} {{ getCurrencySymbol(adInfo.currency) }}
      </div>
      <div class="card__label ellipsis-2-lines">
        {{ adInfo.label }}
      </div>
    </div>
    <q-separator class="card__separator" />
    <div
      v-if="adInfo.status === 'CREATED'"
      class="card__footer"
    >
      <span class="label">Увеличьте количество просмотров</span>
      <q-btn
        unelevated
        color="primary"
      >
        Продвигать
      </q-btn>
    </div>
    <div
      v-else-if="adInfo.status === 'PROMOTING'"
      class="card__footer center"
    >
      <span class="pale-color">Объявление продвигается</span>
    </div>
    <div
      v-else
      class="card__footer center"
    >
      <span class="red-text">Объявление скрыто</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAdInfo } from "~/utils/types"
import {
  getCurrencySymbol,
  formatPrice,
  getDateDifferenceInDaysFromTimestamp,
} from "~/utils/functions"

const props = defineProps<{
  adInfo: IAdInfo
}>()

const daysFromCreation = computed(() => {
  const differenceInDays = getDateDifferenceInDaysFromTimestamp(
    props.adInfo.createdAt,
  )

  if (differenceInDays === 0) {
    return "Сегодня"
  } else if (differenceInDays === 1) {
    return `${differenceInDays} день`
  } else if (differenceInDays >= 2 && differenceInDays <= 4) {
    return `${differenceInDays} дня`
  } else {
    return `${differenceInDays} дней`
  }
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;

  &__image {
    position: relative;

    img {
      width: 100%;
      object-fit: cover;
      border-radius: 1.3rem;
    }
  }

  &__layover {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  &__badge {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem;
    color: var(--q-footer);
    background-color: var(--badge-color);
    border-radius: 0.8rem;
  }

  &__price {
    padding: 1rem 0;
  }

  &__label {
    width: 100%;
  }

  &__info {
    padding: 0 0.5rem;
  }

  &__separator {
    margin: 0.8rem 0;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.7rem;
    padding: 0 0.5rem;
  }
}

.center {
  justify-content: center;
}
</style>
