<template>
  <div class="company">
    <div class="company__icon">
      <img
        :src="`/company-logos/${companyInfo.img}`"
        :alt="companyInfo.name"
      />
    </div>
    <div class="company__title subtitle-large">{{ companyInfo.name }}</div>
    <feedback-statistics
      :premium="companyInfo.premium"
      :rate="companyInfo.rate"
      :review-count="companyInfo.reviewCount"
    />
    <div
      v-if="!hidePhone"
      class="company__phone"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <q-btn
          v-if="!isPhoneShown"
          class="company__phone-btn"
          color="primary"
          @click="isPhoneShown = true"
        >
          Показать номер телефона
        </q-btn>
        <span
          v-else
          class="company__phone-btn"
        >
          {{ companyInfo.phoneNumber }}
        </span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICompanyInfo } from "~/utils/types"

const { hidePhone = false } = defineProps<{
  companyInfo: ICompanyInfo
  hidePhone?: boolean
}>()
const isPhoneShown = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.company {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin: 1.6rem 0 0.8rem;
  }

  &__phone {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.6rem;
  }

  &__phone-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.7rem;
  }
}
</style>
